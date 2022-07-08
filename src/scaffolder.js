import {resolve} from 'node:path';
import {promises as fs} from 'node:fs';

import filedirname from 'filedirname';
import mustache from 'mustache';

import {scaffold} from './gherkin-lint';

export default async function ({projectRoot}) {
  const [, __dirname] = filedirname();

  await Promise.all([
    fs.writeFile(
      `${projectRoot}/cucumber.js`,
      mustache.render(await fs.readFile(resolve(__dirname, '..', 'templates', 'cucumber.mjs'), 'utf-8'))
    ),
    scaffold({projectRoot})
  ]);

  return {
    devDependencies: ['@cucumber/cucumber', 'chai', 'gherkin-lint'],
    scripts: {
      'lint:gherkin': 'gherkin-lint --config=.gherkin-lintrc.json',
      'test:integration': 'run-s \'test:integration:base -- --profile noWip\'',
      'test:integration:base': 'NODE_OPTIONS=--enable-source-maps DEBUG=any cucumber-js test/integration',
      'test:integration:debug': 'DEBUG=test run-s test:integration',
      'test:integration:wip': 'run-s \'test:integration:base -- --profile wip\'',
      'test:integration:wip:debug': 'DEBUG=test run-s \'test:integration:wip\'',
      'test:integration:focus': 'run-s \'test:integration:base -- --profile focus\''
    },
    eslintConfigs: ['cucumber']
  };
}
