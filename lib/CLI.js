const program = require('commander');
const HAP = require('hap-nodejs');
const Server = require('./Server');
const version = require('./Version');

'use strict';

module.exports = function() {
  program
    .version(version)
    .parse(process.argv);

  HAP.init();

  var server = new Server();

  var signals = { 'SIGINT': 2, 'SIGTERM': 15 };
  Object.keys(signals).forEach(function (signal) {
    process.on(signal, function () {
      process.exit(128 + signals[signal]);
    });
  });

  server.run();
}
