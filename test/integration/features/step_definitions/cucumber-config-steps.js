import {promises as fs} from 'node:fs';

import {Given, Then} from '@cucumber/cucumber';
import {assert} from 'chai';
import any from '@travi/any';

Given('the project is using Cucumber.js', async function () {
  await Promise.all([
    fs.writeFile(`${this.projectRoot}/cucumber.js`, any.string()),
    fs.writeFile(
      `${this.projectRoot}/package.json`,
      JSON.stringify({...any.simpleObject(), scripts: any.simpleObject()})
    )
  ]);
});

Then('the cucumber config is written to a(n) {string} file', async function (fileExtension) {
  const cucumberConfig = await fs.readFile(`${this.projectRoot}/cucumber.${fileExtension}`, 'utf-8');

  assert.equal(
    cucumberConfig,
    `const base = {
  formatOptions: {snippetInterface: 'async-await'},
  import: ['test/integration/features/**/*.${fileExtension}']
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
