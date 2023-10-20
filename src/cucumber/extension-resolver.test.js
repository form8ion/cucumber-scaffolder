import {promises as fs} from 'node:fs';

import {describe, vi, it, expect, afterEach} from 'vitest';
import any from '@travi/any';
import {when} from 'jest-when';

import resolveExtension from './extension-resolver.js';

vi.mock('node:fs');

describe('extension resolver', () => {
  const projectRoot = any.string();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should resolve as `mjs` for a commonjs project', async () => {
    when(fs.readFile)
      .calledWith(`${projectRoot}/package.json`, 'utf-8')
      .mockResolvedValue(JSON.stringify({...any.simpleObject(), type: 'commonjs'}));

    expect(await resolveExtension({projectRoot})).toEqual('mjs');
  });

  it('should resolve as `js` for an ESM project', async () => {
    when(fs.readFile)
      .calledWith(`${projectRoot}/package.json`, 'utf-8')
      .mockResolvedValue(JSON.stringify({...any.simpleObject(), type: 'module'}));

    expect(await resolveExtension({projectRoot})).toEqual('js');
  });
});
