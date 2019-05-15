// ------------------------------------------------------------------
// APP CONFIGURATION
// ------------------------------------------------------------------

module.exports = {
  analytics: {
    DashbotAlexa: {
      key: `${process.env.DASHBOT_KEY_ALEXA}`,
    },
    DashbotGoogleAssistant: {
      key: `${process.env.DASHBOT_KEY_GOOGLE}`,
    },
  },
};
