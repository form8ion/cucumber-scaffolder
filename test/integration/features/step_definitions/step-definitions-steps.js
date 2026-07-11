import {promises as fs} from 'node:fs';
import {fileExists} from '@form8ion/core';

import {Given, Then} from '@cucumber/cucumber';
import {assert} from 'chai';
import any from '@travi/any';

Given('a .gitkeep file exists in the step_definitions directory', async function () {
  await fs.mkdir(`${this.projectRoot}/test/integration/features/step_definitions`, {recursive: true});
  await fs.writeFile(`${this.projectRoot}/test/integration/features/step_definitions/.gitkeep`, '');
});

Given('other files exist in the step_definitions directory', async function () {
  await fs.mkdir(`${this.projectRoot}/test/integration/features/step_definitions`, {recursive: true});
  await fs.writeFile(`${this.projectRoot}/test/integration/features/step_definitions/foo.txt`, any.string());
});

Then('the step_definitions directory is created', async function () {
  assert.isTrue(await fileExists(`${this.projectRoot}/test/integration/features/step_definitions/.gitkeep`));
});

Then('the step_definitions directory should only contain a .gitkeep file', async function () {
  const files = await fs.readdir(`${this.projectRoot}/test/integration/features/step_definitions`);

  assert.deepEqual(files, ['.gitkeep']);
});

Then('the step_definitions directory should not contain a .gitkeep file', async function () {
  const files = await fs.readdir(`${this.projectRoot}/test/integration/features/step_definitions`);

  assert.notInclude(files, '.gitkeep');
});

Then('the other files should remain in the step_definitions directory', async function () {
  const files = await fs.readdir(`${this.projectRoot}/test/integration/features/step_definitions`);

  assert.isNotEmpty(files);
});
