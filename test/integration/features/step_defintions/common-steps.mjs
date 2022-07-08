import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

import {After, When} from '@cucumber/cucumber';
import stubbedFs from 'mock-fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pathToProjectRoot = [__dirname, '..', '..', '..', '..'];

After(function () {
  stubbedFs.restore();
});

When('the project is scaffolded', async function () {
  this.scaffoldRoot = process.cwd();

  // eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
  const {scaffold} = await import('@form8ion/cucumber-scaffolder');

  stubbedFs({
    node_modules: stubbedFs.load(resolve(...pathToProjectRoot, 'node_modules')),
    templates: stubbedFs.load(resolve(...pathToProjectRoot, 'templates'))
  });

  this.scaffoldResult = await scaffold({projectRoot: this.scaffoldRoot, ...this.scope && {config: {scope: this.scope}}});
});
