import {promises as fs} from 'node:fs';

import {Then} from '@cucumber/cucumber';
import {assert} from 'chai';

Then('gplint is configured', async function () {
  const {dependencies} = this.results;

  assert.include(dependencies.javascript.development, 'gplint');
  assert.deepEqual(
    JSON.parse(await fs.readFile(`${this.projectRoot}/.gplintrc.json`, 'utf-8')),
    {
      'no-restricted-tags': ['error', {tags: ['@focus']}],
      'use-and': 'error',
      'no-multiple-empty-lines': 'error',
      'no-dupe-feature-names': 'error'
    }
  );
});

Then('the lint script is defined', async function () {
  const {scripts} = this.results;

  assert.equal(scripts['lint:gherkin'], 'gplint --config .gplintrc.json');
});
