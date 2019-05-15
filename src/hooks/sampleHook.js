'use strict';

const hook = (error, host, jovo) => {
    jovo.log.error('sampleHook');
};

module.exports = hook;