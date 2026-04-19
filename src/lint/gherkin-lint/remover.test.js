import {promises as fs} from 'node:fs';

import {describe, it, expect, vi} from 'vitest';
import any from '@travi/any';

import removeGherkinLint from './remover.js';

vi.mock('node:fs');

describe('gherkin-lint remover', () => {
  it('should remove gherkin-lint from the project', async () => {
    const projectRoot = any.string();

    expect(await removeGherkinLint({projectRoot})).toEqual({
      dependencies: {javascript: {remove: ['gherkin-lint']}}
    });

    expect(fs.rm).toHaveBeenCalledWith(`${projectRoot}/.gherkin-lintrc`, {force: true});
    expect(fs.rm).toHaveBeenCalledWith(`${projectRoot}/.gherkin-lintrc.json`, {force: true});
  });
});
