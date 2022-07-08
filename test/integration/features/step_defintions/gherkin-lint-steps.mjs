import {promises as fs} from 'node:fs';

import {Then} from '@cucumber/cucumber';
import {assert} from 'chai';

Then('gherkin-lint is configured', async function () {
  const gherkinLintConfig = JSON.parse(await fs.readFile(`${this.scaffoldRoot}/.gherkin-lintrc.json`, 'utf-8'));

  assert.deepEqual(
    gherkinLintConfig,
    {
      'no-restricted-tags': ['on', {tags: ['@focus']}],
      'use-and': 'on',
      'no-multiple-empty-lines': 'on',
      'no-dupe-feature-names': 'on'
    }
  );
});
