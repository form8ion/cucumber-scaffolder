import {scaffold as scaffoldGherkinLint} from './gherkin-lint';
import {scaffold as scaffoldCucumber} from './cucumber';

export default async function ({projectRoot}) {
  await Promise.all([
    scaffoldCucumber({projectRoot}),
    scaffoldGherkinLint({projectRoot})
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
