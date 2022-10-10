# Display GitHub Action Results [![WDIO-CI](https://github.com/Bluemary04/wdioframework/actions/workflows/wdio.ci.yml/badge.svg)](https://github.com/Bluemary04/wdioframework/actions/workflows/wdio.ci.yml)

## Get Started:

First of all you should make sure you have installed:

 - JDK: To install JDK go to -> https://www.oracle.com/java/technologies/downloads/

 - nvm & node v14 
 
## Repository:

**LINK**: https://github.com/Bluemary04/wdioframework.git

Once you have cloned the repo, install package.json

- On Terminal, change path to the project's path

- To install all dependencies run -> `npm ci`

## How to Execute Automated Tests:

On terminal, run -> `npm run test:demo`

**NOTE**: In the package.jsonfile you will find all possible combinations to run the test. In currently working on improving parameterization to run the tests. Be aware that these queries to run test are compatible with *Windows OS*. For mac or linux, the query is slightly different:

Windows query example:

`set DEBUG=Y&&set HEADLESS=N&&npx wdio config/wdio.test.conf.ts --cucumberOpts.tagExpression='@demo'`

Linux query example:

`export DEBUG=Y&&export HEADLESS=N&&npx wdio config/wdio.test.conf.ts --cucumberOpts.tagExpression='@demo'`

Instead of "SET" used in windows, you have to replace for "EXPORT".
