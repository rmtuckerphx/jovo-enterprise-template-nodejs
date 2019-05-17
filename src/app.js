'use strict';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const { Jovo } = require('jovo-core');
const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistant');

// Plugins
const { JovoDebugger } = require('jovo-plugin-debugger');
const { FileDb } = require('jovo-db-filedb');
const { DynamoDb } = require('jovo-db-dynamodb');
const { DashbotAlexa, DashbotGoogleAssistant } = require('jovo-analytics-dashbot');

const app = new App();

app.use(
  new Alexa(),
  new GoogleAssistant(),
  new JovoDebugger(),
  new FileDb(),
  new DynamoDb(),
  new DashbotAlexa(),
  new DashbotGoogleAssistant()
);

// ------------------------------------------------------------------
// JOVO EXTENSIONS
// ------------------------------------------------------------------

Jovo.prototype.log = require('./jovo-ext/log.js');
Jovo.prototype.processSpeech = require('./jovo-ext/processSpeech.js');

// ------------------------------------------------------------------
// HOOKS
// ------------------------------------------------------------------
//
// app.hook('after.platform.init', require('./hooks/sampleHook.js'));

// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

app.setHandler(
  require('./handlers/coreHandlers.js'),
  require('./handlers/skillEventHandlers.js'),
  require('./handlers/versionHandlers.js'),
  require('./handlers/sampleHandlers.js')
  // add additional handlers here
);

module.exports.app = app;
