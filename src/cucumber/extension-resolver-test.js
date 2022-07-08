import {promises as fs} from 'node:fs';

import any from '@travi/any';
import {assert} from 'chai';
import sinon from 'sinon';

import resolveExtension from './extension-resolver';

suite('extension resolver', () => {
  let sandbox;
  const projectRoot = any.string();

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(fs, 'readFile');
  });

  teardown(() => sandbox.restore());

  test('that `mjs` is resolved for a common-js project', async () => {
    fs.readFile
      .withArgs(`${projectRoot}/package.json`, 'utf-8')
      .resolves(JSON.stringify({...any.simpleObject(), type: 'commohjs'}));

    assert.equal(await resolveExtension({projectRoot}), 'mjs');
  });

  test('that `js` is resolved for an esm project', async () => {
    fs.readFile
      .withArgs(`${projectRoot}/package.json`, 'utf-8')
      .resolves(JSON.stringify({...any.simpleObject(), type: 'module'}));

    assert.equal(await resolveExtension({projectRoot}), 'js');
  });
});
