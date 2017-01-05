const program = require('commander');
const configureLogger = require('./Logger').configure;
const logger = require('./Logger').logger;
const HAP = require('hap-nodejs');
const Server = require('./Server');
const version = require('./Version');

'use strict';

module.exports = function() {
  program
    .version(version)
    .option('-v, --verbose', 'Sets the verbosity level', increaseVerbosity, 0)
    .parse(process.argv);

  configureLogger(program.verbose);

  HAP.init();

  var server = new Server();

  var signals = { 'SIGINT': 2, 'SIGTERM': 15 };
  Object.keys(signals).forEach(function (signal) {
    process.on(signal, function () {
      logger.log('info', 'Got %s, exiting...', signal);
      process.exit(128 + signals[signal]);
    });
  });

  server.run();
}

function increaseVerbosity(v, total) {
  return total + 1;
}
