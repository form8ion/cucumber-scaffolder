import {promises as fs} from 'node:fs';
import mustache from 'mustache';

import {describe, expect, it, vi} from 'vitest';
import any from '@travi/any';
import {when} from 'vitest-when';

import determinePathToTemplate from '../template-path.js';
import resolveExtension from './extension-resolver.js';
import scaffold from './scaffolder.js';

vi.mock('node:fs');
vi.mock('mustache');
vi.mock('./extension-resolver');
vi.mock('../template-path');

describe('cucumber scaffolder', () => {
  it('should scaffold cucumber for an ESM project', async () => {
    const renderedTemplate = any.string();
    const template = any.string();
    const projectRoot = any.string();
    const pathToTemplate = any.string();
    const extension = any.word();
    when(determinePathToTemplate).calledWith('cucumber.mustache').thenReturn(pathToTemplate);
    when(fs.readFile).calledWith(pathToTemplate, 'utf-8').thenResolve(template);
    when(mustache.render).calledWith(template, {extension}).thenReturn(renderedTemplate);
    when(resolveExtension).calledWith({projectRoot}).thenResolve(extension);

    const {dependencies, scripts, eslintConfigs, eslint: {configs}} = await scaffold({projectRoot});

    expect(fs.writeFile).toHaveBeenCalledWith(`${projectRoot}/cucumber.${extension}`, renderedTemplate);
    expect(eslintConfigs).toEqual(['cucumber']);
    expect(configs).toEqual(['cucumber']);
    expect(dependencies.javascript.development).toEqual(['@cucumber/cucumber']);
    expect(scripts).toEqual({
      'test:integration': 'run-s \'test:integration:base -- --profile noWip\'',
      'test:integration:base': 'NODE_OPTIONS=--enable-source-maps DEBUG=any cucumber-js test/integration',
      'test:integration:debug': 'DEBUG=test run-s test:integration',
      'test:integration:wip': 'run-s \'test:integration:base -- --profile wip\'',
      'test:integration:wip:debug': 'DEBUG=test run-s \'test:integration:wip\'',
      'test:integration:focus': 'run-s \'test:integration:base -- --profile focus\''
    });
  });
});
