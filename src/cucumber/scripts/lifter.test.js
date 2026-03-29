import {describe, it, expect} from 'vitest';
import any from '@travi/any';

import liftScripts from './lifter.js';

describe('scripts lifter', () => {
  it('should make no updates if the project does not have a build step', async () => {
    expect(liftScripts({packageDetails: {scripts: any.simpleObject()}})).toEqual({});
  });

  it('should add a pre script to build before running the tests if the project has a build step', async () => {
    expect(liftScripts({packageDetails: {scripts: {build: any.sentence()}}})).toEqual({
      scripts: {'pretest:integration:base': 'run-s build'}
    });
  });
});
