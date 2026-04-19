import deepmerge from 'deepmerge';

import {describe, vi, it, expect} from 'vitest';
import {when} from 'vitest-when';
import any from '@travi/any';

import {remove as removeGherkinLint} from './gherkin-lint/index.js';
import {scaffold as scaffoldGplint} from './gplint/index.js';
import liftLinting from './lifter.js';

vi.mock('deepmerge');
vi.mock('./gherkin-lint/index.js');
vi.mock('./gplint/index.js');

describe('lift lint', () => {
  it('should replace gherkin-lint with gplint', async () => {
    const projectRoot = any.string();
    const scaffoldResults = any.simpleObject();
    const gherkinLintResults = any.simpleObject();
    const mergedResults = any.simpleObject();
    when(removeGherkinLint).calledWith({projectRoot}).thenResolve(gherkinLintResults);
    when(scaffoldGplint).calledWith({projectRoot}).thenResolve(scaffoldResults);
    when(deepmerge).calledWith(gherkinLintResults, scaffoldResults).thenReturn(mergedResults);

    expect(await liftLinting({projectRoot})).toEqual(mergedResults);
  });
});
