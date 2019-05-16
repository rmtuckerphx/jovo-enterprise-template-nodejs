'use strict';

const handlers = {
  HelloWorldIntent() {
    this.log.info('sampleHandlers ---> HelloWorldIntent');

    this.processSpeech(
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

    this.processSpeech(
      'MyNameIs.speech',
      'WhatNext.reprompt',
      'WhatNext.reprompt',
      translationData
    );
  },
};

module.exports = handlers;
