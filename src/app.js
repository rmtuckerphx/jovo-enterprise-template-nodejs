'use strict';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { JovoDebugger } = require('jovo-plugin-debugger');

const { STAGES } = require('./util/constants');

const app = new App();

if (process.env.STAGE === STAGES.LOCAL) {
  const { FileDb } = require('jovo-db-filedb');

  app.use(new FileDb());
} else {
  const { DynamoDb } = require('jovo-db-dynamodb');
  const {
    DashbotAlexa,
    DashbotGoogleAssistant,
  } = require('jovo-analytics-dashbot');

  app.use(new DynamoDb(), new DashbotAlexa(), new DashbotGoogleAssistant());
}

app.use(new Alexa(), new GoogleAssistant(), new JovoDebugger());

// ------------------------------------------------------------------
// HOOKS
// ------------------------------------------------------------------
app.hook('after.platform.init', require('./hooks/logHook.js'));
app.hook('after.platform.init', require('./hooks/sampleHook.js'));

// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

app.setHandler(
  require('./handlers/coreHandlers.js'),
  require('./handlers/versionHandlers.js'),
  require('./handlers/sampleHandlers.js')

  // add additional handlers here
);

module.exports.app = app;
