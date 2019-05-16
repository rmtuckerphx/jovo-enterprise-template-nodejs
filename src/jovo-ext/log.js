'use strict';

const logLevel = process.env.LOG_LEVEL;
const log = require('console-log-level')({ level: logLevel });

module.exports = log;

// samples
// this.log.trace('trace');
// this.log.debug('debug');
// this.log.info('info');
// this.log.warn('warn');
// this.log.error('error');
// this.log.fatal('fatal');
