import {promises as fsPromises} from 'fs';

export default async function ({projectRoot}) {
  await Promise.all([
    fsPromises.copyFile(require.resolve('../templates/cucumber.txt'), `${projectRoot}/cucumber.js`),
    fsPromises.writeFile(
      `${projectRoot}/.gherkin-lintrc`,
      JSON.stringify({
        'no-restricted-tags': ['on', {tags: ['@focus']}],
        'use-and': 'on',
        'no-multiple-empty-lines': 'on',
        'no-dupe-feature-names': 'on'
      })
    )
  ]);

  return {
    devDependencies: ['cucumber', 'chai', 'gherkin-lint'],
    scripts: {
      'lint:gherkin': 'gherkin-lint',
      'test:integration': 'run-s \'test:integration:base -- --profile noWip\'',
      'test:integration:base':
        'NODE_OPTIONS=--enable-source-maps DEBUG=any cucumber-js test/integration --profile base',
      'test:integration:debug': 'DEBUG=test run-s test:integration',
      'test:integration:wip': 'run-s \'test:integration:base -- --profile wip\'',
      'test:integration:wip:debug': 'DEBUG=test run-s \'test:integration:wip\'',
      'test:integration:focus': 'run-s \'test:integration:base -- --profile focus\''
    },
    eslintConfigs: ['cucumber']
  };
}
