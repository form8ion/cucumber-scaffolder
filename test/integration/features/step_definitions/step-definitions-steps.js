import {fileExists} from '@form8ion/core';

import {Then} from '@cucumber/cucumber';
import {assert} from 'chai';

Then('the step_definitions directory is created', async function () {
  assert.isTrue(await fileExists('test/integration/features/step_definitions/.gitkeep'));
});
