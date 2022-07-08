import {promises as fs} from 'node:fs';

import mustache from 'mustache';

import determinePathToTemplate from '../template-path';

export default async function ({projectRoot}) {
  await fs.writeFile(
    `${projectRoot}/cucumber.js`,
    mustache.render(await fs.readFile(determinePathToTemplate('cucumber.mjs'), 'utf-8'))
  );

  return {
    devDependencies: ['@cucumber/cucumber', 'chai'],
    eslintConfigs: ['cucumber'],
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
