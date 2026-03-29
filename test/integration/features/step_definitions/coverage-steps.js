import {promises as fs} from 'node:fs';
import {assert} from 'chai';

import {Given, Then} from '@cucumber/cucumber';

Given('c8 is not currently configured to collect coverage', async function () {
  return undefined;
});

Then('coverage is enabled for the integration tests', async function () {
  assert.deepEqual(JSON.parse(await fs.readFile(`${this.projectRoot}/.c8.integration.js`, 'utf8')), {});
});
