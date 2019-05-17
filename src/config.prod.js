// ------------------------------------------------------------------
// APP CONFIGURATION
// ------------------------------------------------------------------

module.exports = {
  db: {
    DynamoDb: {
      enabled: true,
    },
  },

  analytics: {
    DashbotAlexa: {
      enabled: true,
    },
    DashbotGoogleAssistant: {
      enabled: true,
    },
  },
};
