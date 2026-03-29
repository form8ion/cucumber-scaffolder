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
  const [integrationTests, focusedTests] = await Promise.all([
    fs.readFile(`${this.projectRoot}/.idea/runConfigurations/Integration_Tests.xml`, 'utf-8'),
    fs.readFile(`${this.projectRoot}/.idea/runConfigurations/Focused_Integration_Tests.xml`, 'utf-8')
  ]);

  assert.equal(
    integrationTests,
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
  assert.equal(
    focusedTests,
    `<component name="ProjectRunConfigurationManager">
  <configuration default="false" name="Focused Integration Tests" type="cucumber.js" factoryName="Cucumber.js">
    <option name="myFilePath" value="$PROJECT_DIR$/test/integration/features" />
    <option name="myNameFilter" value="" />
    <option name="cucumberJsArguments" value="--config=./cucumber.js --profile=focus" />
    <option name="workingDirectory" value="$PROJECT_DIR$" />
    <envs>
      <env name="NODE_ENV" value="development" />
      <env name="DEBUG" value="test:*" />
      <env name="NODE_OPTIONS" value="--enable-source-maps" />
    </envs>
    <method v="2" />
  </configuration>
</component>`
  );
});

Then('run configurations perform the build step before running the tests', async function () {
  const [integrationTests, focusedTests] = await Promise.all([
    fs.readFile(`${this.projectRoot}/.idea/runConfigurations/Integration_Tests.xml`, 'utf-8'),
    fs.readFile(`${this.projectRoot}/.idea/runConfigurations/Focused_Integration_Tests.xml`, 'utf-8')
  ]);

  assert.equal(
    integrationTests,
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
    <method v="2">
      <option name="NpmBeforeRunTask" enabled="true">
        <package-json value="$PROJECT_DIR$/package.json" />
        <command value="run" />
        <scripts>
          <script value="build" />
        </scripts>
        <node-interpreter value="project" />
        <envs />
      </option>
    </method>
  </configuration>
</component>`
  );
  assert.equal(
    focusedTests,
    `<component name="ProjectRunConfigurationManager">
  <configuration default="false" name="Focused Integration Tests" type="cucumber.js" factoryName="Cucumber.js">
    <option name="myFilePath" value="$PROJECT_DIR$/test/integration/features" />
    <option name="myNameFilter" value="" />
    <option name="cucumberJsArguments" value="--config=./cucumber.js --profile=focus" />
    <option name="workingDirectory" value="$PROJECT_DIR$" />
    <envs>
      <env name="NODE_ENV" value="development" />
      <env name="DEBUG" value="test:*" />
      <env name="NODE_OPTIONS" value="--enable-source-maps" />
    </envs>
    <method v="2">
      <option name="NpmBeforeRunTask" enabled="true">
        <package-json value="$PROJECT_DIR$/package.json" />
        <command value="run" />
        <scripts>
          <script value="build" />
        </scripts>
        <node-interpreter value="project" />
        <envs />
      </option>
    </method>
  </configuration>
</component>`
  );
});

Then('no run configurations are created', async function () {
  assert.isFalse(await fileExists(`${this.projectRoot}/.idea/runConfigurations/Integration_Tests.xml`));
});
