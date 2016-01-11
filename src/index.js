#!/usr/bin/env node

var version = require('../package.json').version
var program = require('commander');
var moment = require('moment');
var nconf = require('nconf');
var uuid = require('node-uuid');
var Bluebird = require('bluebird');
var promptly = Bluebird.promisifyAll(require('promptly'));
var request = require('request');

nconf.use('file', { file: process.env.HOME + '/.ughconfig.json' });
nconf.load();

function configure(option, value) {
    nconf.set(option, value);
    nconf.save();
    console.log("Set " + option + " to " + value);
};

function start() {
    var id = uuid.v4();
    nconf.set('pending', id);
    nconf.set('startedAt', moment());
    nconf.save();
    console.log("Ugh... sorry this is painful...");
}

function postToUgh(params, callback) {
    request.post({
        url: nconf.get('issuesUrl'),
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    }, function(err, resp, body) {
        if (!err) {
            callback(JSON.parse(body).issue.id);
        } else {
            console.log(err);
        }
    });
}

function cleanup() {
    nconf.clear('pending');
    nconf.clear('startedAt');
    nconf.save();
}

function promptText() {
    return promptly.promptAsync('What was the issue?')
}

function promptRepo() {
    return promptly.promptAsync('What is the link to this repo?')
}

function stop() {
    if (!nconf.get('pending')) {
        throw "You haven't started an issue!"
    };
    var startedAt = nconf.get('startedAt');
    var timestamp = moment().subtract(startedAt).seconds();
    var user = process.env.USER;
    var text, repo;
    promptText()
        .then(function (answer) {
            text = answer;
        })
        .then(promptRepo)
        .then(function(answer) {
            repo = answer;
        })
        .then(function() {
            var params = {repo: repo, reporter: user, time_wasted: timestamp, text: text};
            postToUgh(params, function(id) { console.log("Issue " + id + " has been filed!") });
        })
        .done(cleanup);
}

program
    .version(version);

program
    .command('configure <option> <value>')
    .description('Used to set config options for the ugh client')
    .action(configure);

program
    .command('start')
    .description('Begins time tracking an issue')
    .action(start);

program
    .command('stop')
    .description('Stop time tracking an issue and publish to ugh')
    .action(stop);

program.parse(process.argv);
