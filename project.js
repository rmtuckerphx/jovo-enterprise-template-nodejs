// ------------------------------------------------------------------
// JOVO PROJECT CONFIGURATION
// ------------------------------------------------------------------

module.exports = {
  alexaSkill: {
    nlu: {
      name: 'alexa',
      lang: {
        en: ['en-US'],
      },
    },
    manifest: {
      apis: {
        custom: {
          interfaces: [
            // {
            //   type: 'AUDIO_PLAYER'
            // },
            // {
            //   type: 'RENDER_TEMPLATE',
            //   minimumTemplateVersion: '1.0'
            // },
            // {
            //   type: 'VIDEO_APP'
            // },
            // {
            //   type: 'GADGET_CONTROLLER'
            // },
            // {
            //   type: 'GAME_ENGINE'
            // },
            // {
            //   type: 'CAN_FULFILL_INTENT_REQUEST'
            // },
            // {
            //   type: 'ALEXA_PRESENTATION_APL'
            // }
          ],
        },
      },
      permissions: [
        //   {
        //     name: 'alexa::devices:all:address:full:read',
        //   },
        //   {
        //     name: 'alexa:devices:all:address:country_and_postal_code:read',
        //   },
        //   {
        //     name: 'alexa::profile:name:read',
        //   },
        //   {
        //     name: 'alexa::profile:given_name:read',
        //   },
        //   {
        //     name: 'alexa::profile:email:read',
        //   },
        //   {
        //     name: 'alexa::profile:mobile_number:read',
        //   },
        //   {
        //     name: 'alexa::household:lists:read',
        //   },
        //   {
        //     name: 'alexa::household:lists:write',
        //   },
        //   {
        //     name: 'payments:autopay_consent',
        //   },
        //   {
        //     name: 'alexa::alerts:reminders:skill:readwrite',
        //   },
        //   {
        //     name: 'alexa::devices:all:geolocation:read',
        //   },
        //   {
        //     name: 'alexa::devices:all:notifications:write',
        //   },
      ],
      publishingInformation: {
        // gadgetSupport: {
        //   requirement: 'OPTIONAL',
        //   maxGadgetButtons: 1,
        //   minGadgetButtons: 1,
        //   numPlayersMax: 1,
        //   numPlayersMin: 1
        // },
      },
      events: {
        endpoint: {
          uri: `${JOVO_WEBHOOK_URL}`,
        },
        subscriptions: [
          {
            eventName: 'SKILL_ENABLED',
          },
          {
            eventName: 'SKILL_DISABLED',
          },
          {
            eventName: 'SKILL_PERMISSION_ACCEPTED',
          },
          {
            eventName: 'SKILL_PERMISSION_CHANGED',
          },
          {
            eventName: 'SKILL_ACCOUNT_LINKED',
          },
        ],
      },
    },
  },
  googleAction: {
    nlu: {
      name: 'dialogflow',
      version: 2,
    },
  },
  stages: {
    local: {
      endpoint: '${JOVO_WEBHOOK_URL}',
      alexaSkill: {
        skillId: '',
        askProfile: 'dev',
        languageModel: {
          'en-US': {
            invocation: 'enterprise sample local',
          },
        },
        manifest: {
          publishingInformation: {
            locales: {
              'en-US': {
                name: 'Enterprise Sample - LOCAL',
                examplePhrases: [
                  'Alexa, start Enterprise Sample LOCAL'
                ],
              },
            },
          },
        },
      },
    },
    dev: {
      host: {
        lambda: {
          arn: '<--- LAMBDA ARN --->',
          askProfile: 'dev',
        },
      },
      alexaSkill: {
        skillId: '',
        askProfile: 'dev',
        languageModel: {
          'en-US': {
            invocation: 'enterprise sample dev',
          },
        },
        manifest: {
          publishingInformation: {
            locales: {
              'en-US': {
                name: 'Enterprise Sample - DEV',
                examplePhrases: [
                  'Alexa, start Enterprise Sample DEV'
                ],
              },
            },
          },
          events: {
            endpoint: {
              uri: '<--- LAMBDA ARN --->',
            },
          },
        },
      },
      test: {
        host: {
          lambda: {
            arn: '<--- LAMBDA ARN --->',
            askProfile: 'test',
          },
        },
        alexaSkill: {
          skillId: '',
          askProfile: 'test',
          languageModel: {
            'en-US': {
              invocation: 'enterprise sample test',
            },
          },
          manifest: {
            publishingInformation: {
              locales: {
                'en-US': {
                  name: 'Enterprise Sample - TEST',
                  examplePhrases: [
                    'Alexa, start Enterprise Sample TEST'
                  ],
                },
              },
            },
            events: {
              endpoint: {
                uri: '<--- LAMBDA ARN --->',
              },
            },
          },
        },
      },
      prod: {
        host: {
          lambda: {
            arn: '<--- LAMBDA ARN --->',
            askProfile: 'prod',
          },
        },
        alexaSkill: {
          skillId: '',
          askProfile: 'prod',
          languageModel: {
            'en-US': {
              invocation: 'enterprise sample',
            },
          },
          manifest: {
            publishingInformation: {
              locales: {
                'en-US': {
                  name: 'Enterprise Sample',
                  examplePhrases: [
                    'Alexa, start Enterprise Sample'
                  ],
                },
              },
            },
            events: {
              endpoint: {
                uri: '<--- LAMBDA ARN --->',
              },
            },
          },
        },
      },
    },
  },
};
