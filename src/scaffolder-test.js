import {promises as fs} from 'node:fs';
import mustache from 'mustache';

import {assert} from 'chai';
import any from '@travi/any';
import sinon from 'sinon';

import scaffoldCucumber from './scaffolder';

suite('cucumber scaffolder', () => {
  let sandbox;
  const projectRoot = any.string();

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(fs, 'readFile');
    sandbox.stub(fs, 'writeFile');
    sandbox.stub(mustache, 'render');
  });

  teardown(() => sandbox.restore());

  test('that cucumber is scaffolded', async () => {
    const renderedTemplate = any.string();
    const template = any.string();
    fs.writeFile.resolves();
    fs.readFile.withArgs(require.resolve('../templates/cucumber.mjs'), 'utf-8').resolves(template);
    mustache.render.withArgs(template).returns(renderedTemplate);

    assert.deepEqual(
      await scaffoldCucumber({projectRoot}),
      {
        devDependencies: ['@cucumber/cucumber', 'chai', 'gherkin-lint'],
        scripts: {
          'lint:gherkin': 'gherkin-lint --config=.gherkin-lintrc.json',
          'test:integration': 'run-s \'test:integration:base -- --profile noWip\'',
          'test:integration:base':
          'NODE_OPTIONS=--enable-source-maps DEBUG=any cucumber-js test/integration',
          'test:integration:debug': 'DEBUG=test run-s test:integration',
          'test:integration:wip': 'run-s \'test:integration:base -- --profile wip\'',
          'test:integration:wip:debug': 'DEBUG=test run-s \'test:integration:wip\'',
          'test:integration:focus': 'run-s \'test:integration:base -- --profile focus\''
        },
        eslintConfigs: ['cucumber']
      }
    );
    assert.calledWith(fs.writeFile, `${projectRoot}/cucumber.js`, renderedTemplate);
    assert.calledWith(
      fs.writeFile,
      `${projectRoot}/.gherkin-lintrc.json`,
      JSON.stringify({
        'no-restricted-tags': ['on', {tags: ['@focus']}],
        'use-and': 'on',
        'no-multiple-empty-lines': 'on',
        'no-dupe-feature-names': 'on'
      }, null, 2)
    );
  });
});
