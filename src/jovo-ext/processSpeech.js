'use strict';

function processSpeech(speechKey, promptKey, repromptKey, translationData) {
  const data = translationData || {};

  if (this.$session.$data.isConversationMode) {
    // conversation mode
    this.ask(
      this.$speech
        .t(speechKey, data)
        .addBreak('300ms')
        .t(promptKey, data),
      this.$reprompt.t(repromptKey, data)
    );
  } else {
    // one-shot mode
    this.tell(this.$speech.t(speechKey, data));
  }
}

module.exports = processSpeech;