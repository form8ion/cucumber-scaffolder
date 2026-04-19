import deepmerge from 'deepmerge';

import {describe, it, expect, vi} from 'vitest';
import {when} from 'vitest-when';
import any from '@travi/any';

import {lift as liftCucumber} from './cucumber/index.js';
import {lift as liftLinting} from './lint/index.js';
import lift from './lifter.js';

vi.mock('deepmerge');
vi.mock('./cucumber/index.js');
vi.mock('./lint/index.js');

describe('lifter', () => {
  it('should lift cucumber and linting', async () => {
    const projectRoot = any.string();
    const packageDetails = any.simpleObject();
    const cucumberResults = any.simpleObject();
    const lintingResults = any.simpleObject();
    const mergedResults = any.simpleObject();
    when(liftCucumber).calledWith({projectRoot, packageDetails}).thenReturn(cucumberResults);
    when(liftLinting).calledWith({projectRoot}).thenReturn(lintingResults);
    when(deepmerge).calledWith(cucumberResults, lintingResults).thenReturn(mergedResults);

    expect(await lift({projectRoot, packageDetails})).toEqual(mergedResults);
  });
});
