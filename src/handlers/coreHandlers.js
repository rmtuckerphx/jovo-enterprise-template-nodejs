'use strict';

const handlers = {
  NEW_USER() {
    this.log.info('coreHandlers ---> NEW_USER');
  },

  NEW_SESSION() {
    this.log.info('coreHandlers ---> NEW_SESSION');

    // assume one-shot mode
    this.$session.$data.isConversationMode = false;
  },

  LAUNCH() {
    this.log.info('coreHandlers ---> LAUNCH');

    // switch to conversation mode
    this.$session.$data.isConversationMode = true;

    if (this.$user.isNew()) {
      return this.toIntent('PrivateWelcomeFirst');
    } else {
      return this.toIntent('PrivateWelcomeBack');
    }
  },

  PrivateWelcomeFirst() {
    this.log.info('coreHandlers ---> PrivateWelcomeFirst');

    this.processSpeech(
      'WelcomeFirst.speech',
      'WelcomeFirst.prompt',
      'WelcomeFirst.reprompt'
    );
  },

  PrivateWelcomeBack() {
    this.log.info('coreHandlers ---> PrivateWelcomeBack');

    this.processSpeech(
      'WelcomeBack.speech',
      'WhatNext.reprompt',
      'WhatNext.reprompt'
    );
  },

  StopCancelIntent() {
    this.log.info('coreHandlers --> StopCancelIntent');
    return this.toIntent('END');
  },

  GoodbyeIntent() {
    this.log.info('coreHandlers --> GoodbyeIntent');
    return this.toIntent('END');
  },

  END() {
    this.log.info('coreHandlers --> END');

    if (this.isAlexaSkill()) {
      let reason = this.$alexaSkill.getEndReason();
      this.log.info(reason);
    }

    this.tell(this.$speech.t('Goodbye.speech'));
  },

  HelpIntent() {
    this.log.info('coreHandlers ---> HelpIntent');

    this.processSpeech('Help.speech', 'WhatNext.reprompt', 'WhatNext.reprompt');
  },

  RepeatIntent() {
    this.log.info('coreHandlers ---> RepeatIntent');
    this.repeat();
  },

  StartOverIntent() {
    this.log.info('coreHandlers ---> StartOverIntent');
    return this.toIntent('LAUNCH');
  },

  FallbackIntent() {
    this.log.info('coreHandlers ---> FallbackIntent');

    this.processSpeech(
      'Fallback.speech',
      'WhatNext.reprompt',
      'WhatNext.reprompt'
    );
  },

  Unhandled() {
    this.log.info('coreHandlers ---> Unhandled');
    return this.toIntent('FallbackIntent');
  },
};

module.exports = handlers;
