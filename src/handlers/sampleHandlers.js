'use strict';

const { processSpeech } = require('../util/speechHelper');

const handlers = {
  HelloWorldIntent() {
    this.log.info('sampleHandlers ---> HelloWorldIntent');

    processSpeech.call(
      this,
      'HelloWorld.speech',
      'HelloWorld.prompt',
      'HelloWorld.reprompt'
    );
  },

  MyNameIsIntent() {
    this.log.info('sampleHandlers ---> MyNameIsIntent');

    const translationData = {
      name: this.$inputs.name.value,
    };

    processSpeech.call(
      this,
      'MyNameIs.speech',
      'WhatNext.reprompt',
      'WhatNext.reprompt',
      translationData
    );
  },
};

module.exports = handlers;
