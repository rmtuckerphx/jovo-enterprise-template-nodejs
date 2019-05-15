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

    // this.ask(
    //   this.$speech.t('HelloWorld.speech'),
    //   this.$reprompt.t('WhatNext.reprompt')
    // );
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

    // this.ask(
    //   this.$speech.t('MyNameIs.speech', translationData),
    //   this.$reprompt.t('WhatNext.reprompt')
    // );
  },
};

module.exports = handlers;
