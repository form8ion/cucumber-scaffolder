import deepmerge from 'deepmerge';

import {describe, vi, it, expect, afterEach} from 'vitest';
import any from '@travi/any';
import {when} from 'vitest-when';

import scaffoldCucumber from './cucumber/scaffolder.js';
import scaffoldGherkinLint from './gherkin-lint/scaffolder.js';
import scaffold from './scaffolder.js';

vi.mock('deepmerge');
vi.mock('./cucumber/scaffolder');
vi.mock('./gherkin-lint/scaffolder');

describe('cucumber scaffolder', () => {
  const projectRoot = any.string();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should scaffold the cucumber details', async () => {
    const cucumberResults = any.simpleObject();
    const gherkinLintResults = any.simpleObject();
    const mergedResults = any.simpleObject();
    when(scaffoldCucumber).calledWith({projectRoot}).thenResolve(cucumberResults);
    when(scaffoldGherkinLint).calledWith({projectRoot}).thenResolve(gherkinLintResults);
    when(deepmerge.all).calledWith([cucumberResults, gherkinLintResults]).thenResolve(mergedResults);

    const results = await scaffold({projectRoot});

    expect(results).toEqual(mergedResults);
  });
});
