'use strict';

const hook = (error, host, jovo) => {
    const logLevel = process.env.LOG_LEVEL;
    const log = require('console-log-level')({ level: logLevel })

    jovo.log = log;

    // samples
    // jovo.log.trace('trace');
    // jovo.log.debug('debug');
    // jovo.log.info('info');
    // jovo.log.warn('warn');
    // jovo.log.error('error');
    // jovo.log.fatal('fatal');

};

module.exports = hook;