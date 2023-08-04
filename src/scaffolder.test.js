import deepmerge from 'deepmerge';

import {describe, vi, it, expect, afterEach} from 'vitest';
import any from '@travi/any';
import {when} from 'jest-when';

import scaffoldCucumber from './cucumber/scaffolder';
import scaffoldGherkinLint from './gherkin-lint/scaffolder';
import scaffold from './scaffolder';

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
    when(scaffoldCucumber).calledWith({projectRoot}).mockResolvedValue(cucumberResults);
    when(scaffoldGherkinLint).calledWith({projectRoot}).mockResolvedValue(gherkinLintResults);
    when(deepmerge.all).calledWith([cucumberResults, gherkinLintResults]).mockReturnValue(mergedResults);

    const results = await scaffold({projectRoot});

    expect(results).toEqual(mergedResults);
  });
});
