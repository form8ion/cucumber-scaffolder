import {promises as fs} from 'node:fs';
import {fileExists} from '@form8ion/core';

import {Given, Then} from '@cucumber/cucumber';
import any from '@travi/any';
import {assert} from 'chai';

Given('gherkin-lint is used in the project', async function () {
  await fs.writeFile(`${this.projectRoot}/.gherkin-lintrc.json`, JSON.stringify(any.simpleObject()));
});

Given('gherkin-lint is used in the project with extensionless config', async function () {
  await fs.writeFile(`${this.projectRoot}/.gherkin-lintrc`, JSON.stringify(any.simpleObject()));
});

Then('gherkin-lint is removed from the project', async function () {
  const {dependencies} = this.results;

  assert.include(dependencies.javascript.remove, 'gherkin-lint');
  assert.isFalse(await fileExists(`${this.projectRoot}/.gherkin-lintrc`));
  assert.isFalse(await fileExists(`${this.projectRoot}/.gherkin-lintrc.json`));
});
