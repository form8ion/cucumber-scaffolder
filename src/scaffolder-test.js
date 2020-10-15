import {promises as fsPromises} from 'fs';
import {assert} from 'chai';
import any from '@travi/any';
import sinon from 'sinon';
import scaffoldCucumber from './scaffolder';

suite('cucumber scaffolder', () => {
  let sandbox;
  const projectRoot = any.string();

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(fsPromises, 'copyFile');
    sandbox.stub(fsPromises, 'writeFile');
  });

  teardown(() => sandbox.restore());

  test('that cucumber is scaffolded', async () => {
    fsPromises.copyFile.resolves();
    fsPromises.writeFile.resolves();

    assert.deepEqual(
      await scaffoldCucumber({projectRoot}),
      {
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
      }
    );
    assert.calledWith(fsPromises.copyFile, require.resolve('../templates/cucumber.txt'), `${projectRoot}/cucumber.js`);
    assert.calledWith(
      fsPromises.writeFile,
      `${projectRoot}/.gherkin-lintrc`,
      JSON.stringify({
        'no-restricted-tags': ['on', {tags: ['@focus']}],
        'use-and': 'on',
        'no-multiple-empty-lines': 'on',
        'no-dupe-feature-names': 'on'
      })
    );
  });
});
