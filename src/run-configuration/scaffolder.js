import {promises as fs} from 'node:fs';

function projectHasBuildStep(packageDetails) {
  return !!packageDetails.scripts.build;
}

function buildBeforeRunningTests() {
  return `<method v="2">
      <option name="NpmBeforeRunTask" enabled="true">
        <package-json value="$PROJECT_DIR$/package.json" />
        <command value="run" />
        <scripts>
          <script value="build" />
        </scripts>
        <node-interpreter value="project" />
        <envs />
      </option>
    </method>`;
}

export default async function scaffoldRunConfigurations({projectRoot, packageDetails}) {
  await fs.mkdir(`${projectRoot}/.idea/runConfigurations`, {recursive: true});

  await Promise.all([
    fs.writeFile(
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
    ${projectHasBuildStep(packageDetails) ? buildBeforeRunningTests() : '<method v="2" />'}
  </configuration>
</component>`
    ),
    fs.writeFile(
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
    ${projectHasBuildStep(packageDetails) ? buildBeforeRunningTests() : '<method v="2" />'}
  </configuration>
</component>`
    )
  ]);
}
