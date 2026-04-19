import {describe, it, expect, vi} from 'vitest';
import {when} from 'vitest-when';
import any from '@travi/any';

import {lift as liftCucumber} from './cucumber/index.js';
import lift from './lifter.js';

vi.mock('./cucumber/index.js');

describe('lifter', () => {
  it('should lift cucumber and linting', async () => {
    const projectRoot = any.string();
    const cucumberResults = any.simpleObject();
    const packageDetails = any.simpleObject();
    when(liftCucumber).calledWith({projectRoot, packageDetails}).thenReturn(cucumberResults);

    expect(await lift({projectRoot, packageDetails})).toEqual(cucumberResults);
  });
});
