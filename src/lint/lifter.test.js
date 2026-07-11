import {promises as fs} from 'node:fs';
import deepmerge from 'deepmerge';
import {fileExists} from '@form8ion/core';

import {beforeEach, describe, vi, it, expect} from 'vitest';
import {when} from 'vitest-when';
import any from '@travi/any';

import {remove as removeGherkinLint} from './gherkin-lint/index.js';
import {scaffold as scaffoldGplint} from './gplint/index.js';
import liftLinting from './lifter.js';

vi.mock('node:fs');
vi.mock('@form8ion/core');
vi.mock('deepmerge');
vi.mock('./gherkin-lint/index.js');
vi.mock('./gplint/index.js');

describe('lift lint', () => {
  const projectRoot = any.string();
  const stepDefinitionsDirectory = `${projectRoot}/test/integration/features/step_definitions`;
  const gitKeepPath = `${stepDefinitionsDirectory}/.gitkeep`;
  const scaffoldResults = any.simpleObject();
  const gherkinLintResults = any.simpleObject();
  const mergedResults = any.simpleObject();

  beforeEach(() => {
    when(removeGherkinLint).calledWith({projectRoot}).thenResolve(gherkinLintResults);
    when(scaffoldGplint).calledWith({projectRoot}).thenResolve(scaffoldResults);
    when(deepmerge).calledWith(gherkinLintResults, scaffoldResults).thenReturn(mergedResults);
  });

  it('should replace gherkin-lint with gplint', async () => {
    when(fileExists).calledWith(gitKeepPath).thenResolve(false);

    expect(await liftLinting({projectRoot})).toEqual(mergedResults);
  });

  it('should remove the .gitkeep file when other files are present', async () => {
    when(fileExists).calledWith(gitKeepPath).thenResolve(true);
    when(fs.readdir).calledWith(stepDefinitionsDirectory).thenResolve(['.gitkeep', 'foo.txt']);

    await liftLinting({projectRoot});

    expect(fs.rm).toHaveBeenCalledWith(gitKeepPath);
  });

  it('should keep the .gitkeep file when no other files are present', async () => {
    when(fileExists).calledWith(gitKeepPath).thenResolve(true);
    when(fs.readdir).calledWith(stepDefinitionsDirectory).thenResolve(['.gitkeep']);

    await liftLinting({projectRoot});

    expect(fs.rm).not.toHaveBeenCalled();
  });
});
