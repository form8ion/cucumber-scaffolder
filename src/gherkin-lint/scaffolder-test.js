import {fileTypes} from '@form8ion/core';
import * as configFile from '@form8ion/config-file';

import any from '@travi/any';
import sinon from 'sinon';
import {assert} from 'chai';

import scaffold from './scaffolder';

suite('gherkin-lint scaffolder', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(configFile, 'write');
  });

  teardown(() => sandbox.restore());
  test('that gherkin-lint is scaffolded', async () => {
    const projectRoot = any.string();

    const {scripts, devDependencies} = await scaffold({projectRoot});

    assert.calledWith(
      configFile.write,
      {
        format: fileTypes.JSON,
        name: 'gherkin-lint',
        path: projectRoot,
        config: {
          'no-restricted-tags': ['on', {tags: ['@focus']}],
          'use-and': 'on',
          'no-multiple-empty-lines': 'on',
          'no-dupe-feature-names': 'on'
        }
      }
    );
    assert.deepEqual(devDependencies, ['gherkin-lint']);
    assert.deepEqual(scripts, {'lint:gherkin': 'gherkin-lint --config=.gherkin-lintrc.json'});
  });
});
