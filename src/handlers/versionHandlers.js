'use strict';

const { STAGES } = require('../util/constants');
const { processSpeech } = require('../util/speechHelper');

const handlers = {
  VersionIntent() {
    this.log.info('versionHandlers ---> VersionIntent');

    let version;

    if (process.env.STAGE === STAGES.LOCAL) {
      version = require('../../package.json').version;
    } else {
      version = require('../package.json').version;
    }

    const translationData = {
      version: version,
      stage: process.env.STAGE,
    };

    // this.ask(
    //     this.$speech.t('Version.speech', translationData),
    //     this.$reprompt.t('Version.reprompt')
    // );

    processSpeech.call(
      this,
      'Version.speech',
      'WhatNext.reprompt',
      'Version.reprompt',
      translationData
    );
  },
};

module.exports = handlers;