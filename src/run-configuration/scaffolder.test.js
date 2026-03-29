import {promises as fs} from 'node:fs';

import {describe, it, expect, vi} from 'vitest';
import any from '@travi/any';

import scaffoldRunConfiguration from './scaffolder.js';

vi.mock('node:fs');

describe('run-configuration scaffolder', () => {
  const projectRoot = any.string();

  it('should create a run-configuration for unit-testing with vitest', async () => {
    await scaffoldRunConfiguration({projectRoot});

    expect(fs.mkdir).toHaveBeenCalledWith(`${projectRoot}/.idea/runConfigurations`, {recursive: true});
    expect(fs.writeFile).toHaveBeenCalledWith(
      `${projectRoot}/.idea/runConfigurations/Integration_Tests.xml`,
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
    expect(fs.writeFile).toHaveBeenCalledWith(
      `${projectRoot}/.idea/runConfigurations/Focused_Integration_Tests.xml`,
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
});
