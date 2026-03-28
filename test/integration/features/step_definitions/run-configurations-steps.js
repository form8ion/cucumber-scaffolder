import {promises as fs} from 'node:fs';
import {fileExists} from '@form8ion/core';

import {Given, Then} from '@cucumber/cucumber';
import {assert} from 'chai';

Given('a JetBrains IDE is used with the project', async function () {
  await fs.mkdir(`${this.projectRoot}/.idea`, {recursive: true});
});

Given('no JetBrains run configurations exist for the project', async function () {
  return undefined;
});

Then('run configurations for the primary scripts are created', async function () {
  assert.equal(
    await fs.readFile(`${this.projectRoot}/.idea/runConfigurations/Integration_Tests.xml`, 'utf-8'),
    `<component name="ProjectRunConfigurationManager">
  <configuration default="false" name="Integration Tests" type="cucumber.js" factoryName="Cucumber.js">
    <option name="myFilePath" value="$PROJECT_DIR$/test/integration/features" />
    <option name="myNameFilter" value="" />
    <option name="cucumberJsArguments" value="--config=./cucumber.js --profile=noWip" />
    <option name="workingDirectory" value="$PROJECT_DIR$" />
    <envs>
      <env name="NODE_ENV" value="test" />
      <env name="NODE_OPTIONS" value="--enable-source-maps" />
    </envs>
    <method v="2" />
  </configuration>
</component>`
  );
});

Then('no run configurations are created', async function () {
  assert.isFalse(await fileExists(`${this.projectRoot}/.idea/runConfigurations/Integration_Tests.xml`));
});
