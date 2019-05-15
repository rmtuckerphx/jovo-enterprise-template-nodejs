[![Jovo Framework](https://www.jovo.tech/img/github-logo.png)](https://www.jovo.tech)

<p align="center">Templates for the <a href="https://github.com/jovotech/jovo-framework-nodejs">Jovo Framework</a> ⭐️</p>

<p align="center">
<a href="https://www.jovo.tech/framework/docs/"><strong>Documentation</strong></a> -
<a href="https://github.com/jovotech/jovo-cli"><strong>CLI </strong></a> - <a href="https://github.com/jovotech/jovo-framework-nodejs/blob/master/CONTRIBUTING.md"><strong>Contributing</strong></a> - <a href="https://twitter.com/jovotech"><strong>Twitter</strong></a></p>
<br/>

# Template: Enterprise

Jovo Sample Voice App with stages and multiple handler files, To user this template use the `jovo new` command:

```sh
$ jovo new <directory> --template enterprise
```
This template allows you to get started quickly with an Alexa skill that includes the following:
- Node.js code hosted in AWS Lambda
- DynamoDB user store
- Config values in AWS Lambda environment variables
- Multiple stages: local, dev, test, prod
- Build on this template to include Google Action support

## Stages
This enterprise template makes use of the following stages:
- `local` - skill info and model in Developer console (dev), Node.js code running locally. Used by single developer to develop & debug.
- `dev` - skill info and model in Developer console (dev), Node.js code running in AWS Lambda (dev). Used by development team for integration.
- `test` - skill info and model in Developer console (test), Node.js code running in AWS Lambda (test). Used by testing team (via beta test) for regression, testing, and demos.
- `prod` - skill info and model in Developer console (prod), Node.js code running in AWS Lambda (prod). Used for certification and by users.

## Environments
The following are possible ways to set up an enterprise voice app environment:
- AWS
    - One master AWS account and 2 member AWS accounts (`myorg-nonprod` & `myorg-prod`) in an AWS Organization. Resources for the stages `local` (if any), `dev`, and `test` are in the `myorg-nonprod` account and the `prod` resources are in the `myorg-prod` account.
    - One master AWS account and 3 member AWS accounts (`myorg-dev`, `myorg-test` & `myorg-prod`) in an AWS Organization. Resources for the stages `local` (if any) and `dev` are in the `myorg-dev` account, resources for `test` are in `myorg-test` account, and the `prod` resource are in the `myorg-prod` account.
    - One master AWS account for all stages (not recommended). Gets messy with resources from different stages and is harder to control access to production.
- Developer Console
    - Create 3 [Developer Console accounts](https://developer.amazon.com/) plus 1 Developer account per developer.
        1. **Developer** - each developer will have their own account using their email address. They will then be given [user permissions](https://developer.amazon.com/settings/console/userpermissions/detail) as either an Administrator or Developer to the other console accounts where they have access. This account will be for skills in the `local` stage.
        Set the [Company Profile](https://developer.amazon.com/settings/console/profile/detail) as shown:
            - *email*: developer's email (ex: developer.name@myorg.com)
            - *Developer name or company name*: developer name

        2. **Dev Integration** - This account will be for skills in the `dev` stage.
            - *email*: alexa+dev@myorg.com
            - *Developer name or company name*: My Org - DEV
        3. **Test** - This account will be for skills in the `test` stage.
            - *email*: alexa+test@myorg.com
            - Developer* name or company name*: My Org - TEST
        4. **Production** - This account will be for skills in the `prod` stage.
            - *email*: alexa+prod@myorg.com
            - *Developer name or company name*: My Org

    - Depending on the number of skills, you might be able to use a `nonprod` Developer account and a `prod` account. Each developer should still have their own account and permissions given to the other accounts.
    - Keep logins for each Developer account locked down and have developers access via user permissions.
- You can create a single email account for the `dev`, `test`, and `prod` environments (or `nonprod` & `prod`) and then use the email "+" alias to create unique email addresses. For example `alexa@myorg.com` can be turned into `alexa+dev@myorg.com` or `alexa+prod@myorg.com`

## project.js
Each stage has a section in the `project.js` file and is used at build time to set the skill ID, invocation name, skill name, example phrase, endpoint, and more. See the [Project Configuration - Stages](https://www.jovo.tech/docs/project-js#stages) docs. Which stage is selected is determined by the `--stage` parameter of the `jovo build` command:

```sh
## local
$ jovo build --stage local

## dev
$ jovo build --stage dev

## test
$ jovo build --stage test

## prod
$ jovo build --stage prod

```
Some of the values that you will need to manually set in the `project.js` file when you get started are:
- invocation
- askProfile
- name
- examplePhrases
- lambda arn
- permissions
- interfaces
- gadgetSupport

NOTE: It can be useful to name lambda functions, DynamoDB tables, S3 buckets, etc. with a suffix based on the deployment stage.

Example: `arn:aws:lambda:us-east-1:000000000000:function:myorg-enterprise-voiceapp-prod`


After running the `jovo deploy` command for a stage, copy the `skillId` value from `platforms/alexaSkill/.ask/config` and set the `skillId` for the corresponding stage in `project.js`.

When you build a project, the `skillId` for the specified stage is set in the `platforms/alexaSkill/.ask/config` file.

Values from `project.js` will be merged over any values that you have manually set in the `en-US.json` or `skill.json` files under the `platforms/alexaSkill` folder.

## ASK CLI
One of the values in the `project.js` file for each stage is the `askProfile`. Each `askProfile` represents the pairing of an AWS account and a Developer Console account. For this template, we should have 1 profile for each stage.

You must have the ASK CLI installed to create these profiles and then you issue the `ask init` command and follow its prompts:

```sh
$ ask init
```

For more details, see the [Set up Credentials with ASK CLI](https://www.jovo.tech/tutorials/deploy-lambda-cli#set-up-credentials-with-ask-cli) docs.

This process will write entries to both the AWS `credentials` file and the ASK `cli_config` file. The result should look something like the following:

### credentials (AWS)
```ini
## Option 1
[myorg-dev-aws]
aws_access_key_id=AAA...
aws_secret_access_key=aaa...

[myorg-test-aws]
aws_access_key_id=BBB...
aws_secret_access_key=bbb...

[myorg-prod-aws]
aws_access_key_id=CCC...
aws_secret_access_key=ccc...


## Option 2
[myorg-devname]
aws_access_key_id=AAA...
aws_secret_access_key=aaa...

[myorg-dev-aws]
role_arn=arn:aws:iam::<dev-account>:role/admin
source_profile=myorg-devname

[myorg-test-aws]
role_arn=arn:aws:iam::<test-account>:role/admin
source_profile=myorg-devname

[myorg-prod-aws]
role_arn=arn:aws:iam::<prod-account>:role/admin
source_profile=myorg-devname
```

Location of the `credentials` file:
- Linux/Mac: `~/.aws/credentials`
- Windows: `%USERPROFILE%\.aws\credentials`


Make sure the values in `project.js` for `askProfile` matches the profile names in `cli_config`:

### cli_config (ASK CLI)
```json
{
  "profiles": {
    "local": {
      "token": {
        "access_token": "...",
        "refresh_token": "...",
        "token_type": "bearer",
        "expires_in": 3600,
        "expires_at": "2019-05-08T23:09:26.413Z"
      },
      "vendor_id": "<based on Developer Account>",
      "aws_profile": "myorg-dev-aws"
    },
    "dev": {
      "token": {
        "access_token": "...",
        "refresh_token": "...",
        "token_type": "bearer",
        "expires_in": 3600,
        "expires_at": "2019-05-08T23:09:26.413Z"
      },
      "vendor_id": "<based on Developer Account>",
      "aws_profile": "myorg-dev-aws"
    },
    "test": {
      "token": {
        "access_token": "...",
        "refresh_token": "...",
        "token_type": "bearer",
        "expires_in": 3600,
        "expires_at": "2019-05-08T23:09:26.413Z"
      },
      "vendor_id": "<based on Developer Account>",
      "aws_profile": "myorg-test-aws"
    },
    "prod": {
      "token": {
        "access_token": "...",
        "refresh_token": "...",
        "token_type": "bearer",
        "expires_in": 3600,
        "expires_at": "2019-05-08T23:09:26.413Z"
      },
      "vendor_id": "<based on Developer Account>",
      "aws_profile": "myorg-prod-aws"
    }
  }
}
```
Location of the `cli_config` file:
- Linux/Mac: `~/.ask/cli_config`
- Windows: `%USERPROFILE%\.ask\cli_config`

## config.js
Each stage will gets its own stage-specific config file which will be merged with the main `config.js`. See the [App Configuration - Staging](https://www.jovo.tech/docs/config-js#staging) docs. These config files are used at runtime and are selected based on the value of the `STAGE` environment variable.


## .env
When running the `local` stage, environment variables are read from the `.env` file. Other stages read from the Lambda function's environment variables. A sample file (`.env.example`) is included with this template. Create a `.env` file in the same folder and copy the contents of `.env.example` into it. Then set the values of each variable.

All entries in `.env.example` (with the exception of `AWS_REGION`) need to be created as environment variables for each skill Lambda function in each account.

The `.env` file should not be checked in to the repo. That is why it is included in the `.gitignore` file.

## i18n
Translations for each language are included in files under the `i18n` folder. The `config.js` file includes configuration settings for translations.

## skill.json
The first time you run `jovo build` for an Alexa skill, a `skill.json` file will be created under the `platforms/alexaSkill` folder.

You can make changes to the `skill.json` file but they could be overwritten when values in the `project.js` file are merged with it. Always build and then review the file to make sure it is correct.

One value that you will likely need to change is the `category` that the skill will appear as in the Skill Store. You can find a list of values in the [Category enumeration](https://developer.amazon.com/docs/smapi/skill-manifest.html#category-enum) docs.

# Quick Commands

**local**
```sh
## build options
$ jovo build --stage local

$ jovo build -p alexaSkill --stage local
$ jovo build --platform alexaSkill --stage local

## deploy options
$ jovo deploy --stage dev

$ jovo deploy -p alexaSkill --stage dev
$ jovo deploy -p alexaSkill --stage dev -t info
$ jovo deploy -p alexaSkill --stage dev -t model

## run
$ jovo run

## debug
$ jovo run --inspect
```

**dev**
```sh
## build options
$ jovo build --stage dev

$ jovo build -p alexaSkill --stage dev

## deploy options
$ jovo deploy --stage dev

$ jovo deploy -p alexaSkill --stage dev
$ jovo deploy -p alexaSkill --stage dev -t info
$ jovo deploy -p alexaSkill --stage dev -t model
$ jovo deploy -p alexaSkill --stage dev -t zip
$ jovo deploy -p alexaSkill --stage dev -t lambda
```

**test**
```sh
## build options
$ jovo build --stage test

$ jovo build -p alexaSkill --stage test

## deploy options
$ jovo deploy --stage test

$ jovo deploy -p alexaSkill --stage test
$ jovo deploy -p alexaSkill --stage test -t info
$ jovo deploy -p alexaSkill --stage test -t model
$ jovo deploy -p alexaSkill --stage test -t zip
$ jovo deploy -p alexaSkill --stage test -t lambda
```

**prod**
```sh
## build options
$ jovo build --stage prod

$ jovo build -p alexaSkill --stage prod

## deploy options
$ jovo deploy --stage prod

$ jovo deploy -p alexaSkill --stage prod
$ jovo deploy -p alexaSkill --stage prod -t info
$ jovo deploy -p alexaSkill --stage prod -t model
$ jovo deploy -p alexaSkill --stage prod -t zip
$ jovo deploy -p alexaSkill --stage prod -t lambda
```