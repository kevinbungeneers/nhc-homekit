'use strict';

const winston = require('winston');
const util = require('util');

module.exports = {
  logger: winston,
  configure: configureLogger
}

function configureLogger(level) {
  winston.configure({
    transports: [
      new (winston.transports.Console)({
        colorize: true,
        level: getVerbosityLevel(level)
      })
    ]
  });
}

function getVerbosityLevel(v) {
  switch (v) {
    case 5:
      return 'silly';
    case 4:
      return 'debug';
    case 3:
      return 'verbose';
    case 2:
      return 'info';
    case 1:
      return 'warn';
    case 0:
    default:
      return 'error';
  }
}
