import {promises as fs} from 'node:fs';
import mustache from 'mustache';

import {describe, it, vi, expect} from 'vitest';
import {when} from 'vitest-when';
import any from '@travi/any';

import determinePathToTemplate from '../../template-path.js';
import resolveExtensionForProjectType from '../extension-resolver.js';
import scaffoldConfig from './scaffolder.js';

vi.mock('node:fs');
vi.mock('mustache');
vi.mock('../../template-path.js');
vi.mock('../extension-resolver.js');

describe('config scaffolder', () => {
  it('should scaffold the cucumber config', async () => {
    const projectRoot = any.string();
    const extension = any.word();
    const renderedTemplate = any.string();
    const pathToTemplate = any.string();
    const template = any.string();
    when(resolveExtensionForProjectType).calledWith({projectRoot}).thenResolve(extension);
    when(determinePathToTemplate).calledWith('cucumber.mustache').thenReturn(pathToTemplate);
    when(fs.readFile).calledWith(pathToTemplate, 'utf-8').thenResolve(template);
    when(mustache.render).calledWith(template, {extension}).thenReturn(renderedTemplate);

    await scaffoldConfig({projectRoot});

    expect(fs.writeFile).toHaveBeenCalledWith(
      `${projectRoot}/cucumber.${extension}`,
      renderedTemplate
    );
  });
});
