'use strict';

const handlers = {
  ON_EVENT: {
    'AlexaSkillEvent.SkillEnabled'() {
      this.log.info('skillEventHandlers ---> AlexaSkillEvent.SkillEnabled');
      this.log.info(`UserId: ${this.getUserId()}`);
    },
    'AlexaSkillEvent.SkillDisabled'() {
      this.log.info('skillEventHandlers ---> AlexaSkillEvent.SkillDisabled');
      this.log.info(`UserId: ${this.getUserId()}`);

      // Remove user from the database when the skill is disabled
      // if the user re-enables the skill, they will have a new userId anyway
      this.$user.delete();
    },
    'AlexaSkillEvent.SkillAccountLinked'() {
      this.log.info('skillEventHandlers ---> AlexaSkillEvent.SkillAccountLinked');
      this.log.info(`UserId: ${this.getUserId()}`);
    },
    'AlexaSkillEvent.SkillPermissionAccepted'() {
      this.log.info('skillEventHandlers ---> AlexaSkillEvent.SkillPermissionAccepted');
      this.log.info(`UserId: ${this.getUserId()}`);
      this.log.info(`Permissions: ${JSON.stringify(this.$alexaSkill.getSkillEventBody().acceptedPermissions)}`);
    },
    'AlexaSkillEvent.SkillPermissionChanged'() {
      this.log.info('skillEventHandlers ---> AlexaSkillEvent.SkillPermissionChanged');
      this.log.info(`UserId: ${this.$user.Id()}`);
      this.log.info(`Permissions: ${JSON.stringify(this.$alexaSkill.getSkillEventBody().acceptedPermissions)}`);
    },
    'AlexaSkillEvent.ProactiveSubscriptionChanged'() {
      this.log.info('skillEventHandlers ---> AlexaSkillEvent.ProactiveSubscriptionChanged');
      this.log.info(`UserId: ${this.$user.Id()}`);
      this.log.info(`Permissions: ${JSON.stringify(this.$alexaSkill.getSkillEventBody().subscriptions)}`);
    },
    Unhandled() {
      this.log.info('skillEventHandlers ---> Unhandled');
      this.log.info(`Missing ON_EVENT subType: ${this.$alexaSkill.$type.subType}`);
    },
  },
};

module.exports = handlers;
