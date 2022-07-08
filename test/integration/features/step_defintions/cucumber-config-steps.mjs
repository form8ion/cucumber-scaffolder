import {promises as fs} from 'node:fs';

import {Then} from '@cucumber/cucumber';
import {assert} from 'chai';

Then('the cucumber config is written to a(n) {string} file', async function (fileExtension) {
  const cucumberConfig = await fs.readFile(`${this.scaffoldRoot}/cucumber.${fileExtension}`, 'utf-8');

  assert.equal(
    cucumberConfig,
    `const base = {
  formatOptions: {snippetInterface: 'async-await'},
  import: ['test/integration/features/**/*.${fileExtension}'],
  publishQuiet: true
};

export default base;

export const wip = {
  ...base,
  tags: '@wip and not @skip'
};

export const noWip = {
  ...base,
  tags: 'not @skip and not @wip'
};

export const focus = {
  ...base,
  tags: '@focus'
};
`
  );
});
