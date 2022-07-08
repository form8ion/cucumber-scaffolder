import {Then} from '@cucumber/cucumber';
import {assert} from 'chai';

Then('the npm scripts are defined', async function () {
  const {scripts} = this.scaffoldResult;

  assert.includeDeepMembers(
    Object.entries(scripts),
    Object.entries({
      'lint:gherkin': 'gherkin-lint --config=.gherkin-lintrc.json',
      'test:integration': 'run-s \'test:integration:base -- --profile noWip\'',
      'test:integration:base':
      'NODE_OPTIONS=--enable-source-maps DEBUG=any cucumber-js test/integration',
      'test:integration:debug': 'DEBUG=test run-s test:integration',
      'test:integration:wip': 'run-s \'test:integration:base -- --profile wip\'',
      'test:integration:wip:debug': 'DEBUG=test run-s \'test:integration:wip\'',
      'test:integration:focus': 'run-s \'test:integration:base -- --profile focus\''
    })
  );
});
