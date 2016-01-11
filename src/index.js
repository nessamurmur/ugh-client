var version = require('../package.json').version
var program = require('commander');
var moment = require('moment');
var nconf = require('nconf');
var uuid = require('node-uuid');

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
    nconf.set('startedAt', new Date());
    nconf.save();
    console.log("Ugh... sorry this is painful...");
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

program.parse(process.argv);
