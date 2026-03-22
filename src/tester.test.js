import {fileExists} from '@form8ion/core';

import {expect, describe, it, vi} from 'vitest';
import {when} from 'vitest-when';
import any from '@travi/any';

import cucumberInUse from './tester.js';

vi.mock('@form8ion/core');

describe('tester', () => {
  const projectRoot = any.string();

  it('should return `true` if a javascript cucumber config file is found', async () => {
    when(fileExists).calledWith(`${projectRoot}/cucumber.js`).thenResolve(true);

    expect(await cucumberInUse({projectRoot})).toBe(true);
  });

  it('should return `true` if an mjs cucumber config file is found', async () => {
    when(fileExists).calledWith(`${projectRoot}/cucumber.js`).thenResolve(false);
    when(fileExists).calledWith(`${projectRoot}/cucumber.mjs`).thenResolve(true);

    expect(await cucumberInUse({projectRoot})).toBe(true);
  });

  it('should return `false` when cucumber is not detected', async () => {
    when(fileExists).calledWith(`${projectRoot}/cucumber.js`).thenResolve(false);
    when(fileExists).calledWith(`${projectRoot}/cucumber.mjs`).thenResolve(false);

    expect(await cucumberInUse({projectRoot})).toBe(false);
  });
});
