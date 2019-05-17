// ------------------------------------------------------------------
// APP CONFIGURATION
// ------------------------------------------------------------------

module.exports = {
  logging: true,

  intentMap: {
    'AMAZON.StopIntent': 'StopCancelIntent',
    'AMAZON.CancelIntent': 'StopCancelIntent',
    'AMAZON.HelpIntent': 'HelpIntent',
    'AMAZON.RepeatIntent': 'RepeatIntent',
    'AMAZON.PreviousIntent': 'PreviousIntent',
    'AMAZON.StartOverIntent': 'StartOverIntent',
    'AMAZON.FallbackIntent': 'FallbackIntent',
    // 'AMAZON.YesIntent': 'YesIntent',
    // 'AMAZON.NoIntent': 'NoIntent',
  },

  intentsToSkipUnhandled: [
    'END',
    'GoodbyeIntent',
    'HelpIntent',
    'RepeatIntent',
    'StartOverIntent',
  ],

  db: {
    FileDb: {
      enabled: false,
    },
    DynamoDb: {
      enabled: false,
      tableName: `${process.env.DYNAMODB_USERS_TABLE}`,
    },
  },

  analytics: {
    DashbotAlexa: {
      enabled: false,
      key: `${process.env.DASHBOT_KEY_ALEXA}`,
    },
    DashbotGoogleAssistant: {
      enabled: false,
      key: `${process.env.DASHBOT_KEY_GOOGLE}`,
    },
  },

  i18n: {
    returnNull: false,
    fallbackLng: 'en-US',
  },

  user: {
    context: {
      enabled: true,
    },
  },
};
