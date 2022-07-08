import mustache from 'mustache';

import {assert} from 'chai';
import any from '@travi/any';
import sinon from 'sinon';

import * as cucumberScaffolder from './cucumber/scaffolder';
import * as gherkinLintScaffolder from './gherkin-lint/scaffolder';
import scaffoldCucumber from './scaffolder';

suite('cucumber scaffolder', () => {
  let sandbox;
  const projectRoot = any.string();

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(mustache, 'render');
    sandbox.stub(gherkinLintScaffolder, 'default');
    sandbox.stub(cucumberScaffolder, 'default');
  });

  teardown(() => sandbox.restore());

  test('that cucumber is scaffolded', async () => {
    assert.deepEqual(
      await scaffoldCucumber({projectRoot}),
      {
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
      }
    );
    assert.calledWith(cucumberScaffolder.default, {projectRoot});
    assert.calledWith(gherkinLintScaffolder.default, {projectRoot});
  });
});
