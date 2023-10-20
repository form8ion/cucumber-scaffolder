import {fileTypes} from '@form8ion/core';
import {write as writeConfigFile} from '@form8ion/config-file';

import {afterEach, describe, expect, it, vi} from 'vitest';
import any from '@travi/any';

import scaffold from './scaffolder.js';

vi.mock('@form8ion/config-file');

describe('gherkin-lint scaffolder', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should scaffold gherkin-lint', async () => {
    const projectRoot = any.string();

    const {scripts, devDependencies} = await scaffold({projectRoot});

    expect(writeConfigFile).toHaveBeenCalledWith({
      format: fileTypes.JSON,
      name: 'gherkin-lint',
      path: projectRoot,
      config: {
        'no-restricted-tags': ['on', {tags: ['@focus']}],
        'use-and': 'on',
        'no-multiple-empty-lines': 'on',
        'no-dupe-feature-names': 'on'
      }
    });
    expect(devDependencies).toEqual(['gherkin-lint']);
    expect(scripts).toEqual({'lint:gherkin': 'gherkin-lint --config=.gherkin-lintrc.json'});
  });
});
