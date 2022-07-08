import {promises as fs} from 'node:fs';

import mustache from 'mustache';

import any from '@travi/any';
import sinon from 'sinon';
import {assert} from 'chai';

import * as templatePath from '../template-path';
import scaffold from './scaffolder';

suite('cucumber scaffolder', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(templatePath, 'default');
    sandbox.stub(fs, 'readFile');
    sandbox.stub(fs, 'writeFile');
    sandbox.stub(mustache, 'render');
  });

  teardown(() => sandbox.restore());

  test('that cucumber is scaffolded for an esm project', async () => {
    const renderedTemplate = any.string();
    const template = any.string();
    const projectRoot = any.string();
    const pathToTemplate = any.string();
    templatePath.default.withArgs('cucumber.mjs').returns(pathToTemplate);
    fs.readFile.withArgs(pathToTemplate, 'utf-8').resolves(template);
    mustache.render.withArgs(template).returns(renderedTemplate);

    await scaffold({projectRoot});

    assert.calledWith(fs.writeFile, `${projectRoot}/cucumber.js`, renderedTemplate);
  });
});
