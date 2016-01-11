var version = require('../package.json').version
var program = require('commander');
var moment = require('moment');
var nconf = require('nconf');

nconf.use('file', { file: process.env.HOME + '/.ughconfig.json' });
nconf.load();

function configure(option, value) {
    nconf.set(option, value);
    nconf.save();
    console.log("Set " + option + " to " + value);
};

program
    .version(version);

program
    .command('configure <option> <value>')
    .description('Used to set config options for the ugh client')
    .action(configure);

program.parse(process.argv);