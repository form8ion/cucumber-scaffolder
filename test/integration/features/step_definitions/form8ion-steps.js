import {optionsSchemas, validateOptions} from '@form8ion/core';

import {Then} from '@cucumber/cucumber';
import assert from 'node:assert';

// eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
import * as plugin from '@form8ion/cucumber-scaffolder';

Then('the public interface is compatible with the plugin schema', async function () {
  validateOptions(optionsSchemas.form8ionPlugin, plugin);
});

Then('the output produced by the scaffolder is detectable by the predicate', async function () {
  assert.equal(await plugin.test({projectRoot: this.projectRoot}), true);
});
