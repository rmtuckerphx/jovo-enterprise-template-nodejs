'use strict';

const hook = (error, host, jovo) => {
    const logLevel = process.env.LOG_LEVEL;
    const log = require('console-log-level')({ level: logLevel })

    jovo.log = log;
};

module.exports = hook;