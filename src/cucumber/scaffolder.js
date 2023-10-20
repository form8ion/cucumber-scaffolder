import {promises as fs} from 'node:fs';

import mustache from 'mustache';

import determinePathToTemplate from '../template-path.js';
import resolveExtensionForProjectType from './extension-resolver.js';

export default async function ({projectRoot}) {
  const extension = await resolveExtensionForProjectType({projectRoot});
  const eslintConfigs = ['cucumber'];

  await fs.writeFile(
    `${projectRoot}/cucumber.${extension}`,
    mustache.render(await fs.readFile(determinePathToTemplate('cucumber.mustache'), 'utf-8'), {extension})
  );

  return {
    devDependencies: ['@cucumber/cucumber', 'chai'],
    eslintConfigs,
    eslint: {configs: eslintConfigs},
    scripts: {
      'test:integration': 'run-s \'test:integration:base -- --profile noWip\'',
      'test:integration:base': 'NODE_OPTIONS=--enable-source-maps DEBUG=any cucumber-js test/integration',
      'test:integration:debug': 'DEBUG=test run-s test:integration',
      'test:integration:wip': 'run-s \'test:integration:base -- --profile wip\'',
      'test:integration:wip:debug': 'DEBUG=test run-s \'test:integration:wip\'',
      'test:integration:focus': 'run-s \'test:integration:base -- --profile focus\''
    }
  };
}
