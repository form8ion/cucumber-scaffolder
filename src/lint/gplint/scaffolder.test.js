import {fileTypes} from '@form8ion/core';
import {write as writeConfigFile} from '@form8ion/config-file';

import {afterEach, describe, expect, it, vi} from 'vitest';
import any from '@travi/any';

import scaffold from './scaffolder.js';

vi.mock('@form8ion/config-file');

describe('gplint scaffolder', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should scaffold gplint', async () => {
    const projectRoot = any.string();

    const {scripts, dependencies} = await scaffold({projectRoot});

    expect(writeConfigFile).toHaveBeenCalledWith({
      format: fileTypes.JSON,
      name: 'gplint',
      path: projectRoot,
      config: {
        'no-restricted-tags': ['error', {tags: ['@focus']}],
        'use-and': 'error',
        'no-multiple-empty-lines': 'error',
        'no-dupe-feature-names': 'error'
      }
    });
    expect(dependencies.javascript.development).toEqual(['gplint']);
    expect(scripts).toEqual({'lint:gherkin': 'gplint --config .gplintrc.json'});
  });
});
