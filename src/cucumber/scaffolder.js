import {scaffold as scaffoldConfig} from './config/index.js';

export default async function scaffoldCucumber({projectRoot}) {
  const eslintConfigs = ['cucumber'];

  await scaffoldConfig({projectRoot});

  return {
    dependencies: {javascript: {development: ['@cucumber/cucumber']}},
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
