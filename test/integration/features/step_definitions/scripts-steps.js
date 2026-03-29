import {Then} from '@cucumber/cucumber';
import {assert} from 'chai';

Then('the npm scripts are defined', async function () {
  const {scripts} = this.results;

  assert.includeDeepMembers(
    Object.entries(scripts),
    Object.entries({
      'lint:gherkin': 'gherkin-lint --config=.gherkin-lintrc.json',
      'test:integration': 'run-s \'test:integration:base -- --profile noWip\'',
      'test:integration:base': 'NODE_OPTIONS=--enable-source-maps DEBUG=any cucumber-js test/integration',
      'test:integration:debug': 'DEBUG=test run-s test:integration',
      'test:integration:wip': 'run-s \'test:integration:base -- --profile wip\'',
      'test:integration:wip:debug': 'DEBUG=test run-s \'test:integration:wip\'',
      'test:integration:focus': 'run-s \'test:integration:base -- --profile focus\''
    })
  );
});

Then('a script is defined to run the build step before running the integration tests', async function () {
  const {scripts} = this.results;

  assert.equal(scripts['pretest:integration:base'], 'run-s build');
});
