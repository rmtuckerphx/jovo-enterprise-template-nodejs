'use strict';

const hook = (error, host, jovo) => {
    jovo.log.info('sampleHook called');
};

module.exports = hook;