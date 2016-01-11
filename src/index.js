var version = require('../package.json').version
var program = require('commander');
var moment = require('moment');
var shell = require('shelljs');
var fs = require('fs');

function removeConfigFile(fileName) {
    shell.rm(fileName);
}

function writeConfigFile(fileName, config) {
    var contents = JSON.stringify(config);
    fs.writeFile(fileName, contents, function(err, written, buffer) {
        if (!err) {
            console.log("Config written!")
        }
    });
}

function configure(option, value) {
    var fileName = 'config.json'

    if (shell.test('-e', fileName)) {
        var config = require('../' + fileName);
        removeConfigFile(fileName);
    } else {
        var config = {};
    }
    config[option] = value;
    writeConfigFile(fileName, config);
};

program
    .version(version);

program
    .command('configure <option> <value>')
    .description('Used to set config options for the ugh client')
    .action(configure);

program.parse(process.argv);