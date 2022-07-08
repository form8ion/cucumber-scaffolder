import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {promises as fs} from 'node:fs';

import {After, Before, Given, When} from '@cucumber/cucumber';
import stubbedFs from 'mock-fs';

let scaffold;
const __dirname = dirname(fileURLToPath(import.meta.url));
const pathToProjectRoot = [__dirname, '..', '..', '..', '..'];

Before(async function () {
  this.scaffoldRoot = process.cwd();

  // eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
  ({scaffold} = await import('@form8ion/cucumber-scaffolder'));

  stubbedFs({
    node_modules: stubbedFs.load(resolve(...pathToProjectRoot, 'node_modules')),
    templates: stubbedFs.load(resolve(...pathToProjectRoot, 'templates'))
  });
});

After(function () {
  stubbedFs.restore();
});

Given('the project is of type {string}', async function (moduleType) {
  await fs.writeFile(`${this.scaffoldRoot}/package.json`, JSON.stringify({type: moduleType}));
});

When('the project is scaffolded', async function () {
  this.scaffoldResult = await scaffold({projectRoot: this.scaffoldRoot, ...this.scope && {config: {scope: this.scope}}});
});
