import {describe, expect, it, vi} from 'vitest';
import any from '@travi/any';

import {scaffold as scaffoldConfig} from './config/index.js';
import scaffold from './scaffolder.js';

vi.mock('./config/index.js');

describe('cucumber scaffolder', () => {
  it('should scaffold cucumber', async () => {
    const projectRoot = any.string();

    const {dependencies, scripts, eslintConfigs, eslint: {configs}} = await scaffold({projectRoot});

    expect(scaffoldConfig).toHaveBeenCalledWith({projectRoot});
    expect(eslintConfigs).toEqual(['cucumber']);
    expect(configs).toEqual(['cucumber']);
    expect(dependencies.javascript.development).toEqual(['@cucumber/cucumber']);
    expect(scripts).toEqual({
      'test:integration': 'run-s \'test:integration:base -- --profile noWip\'',
      'test:integration:base': 'NODE_OPTIONS=--enable-source-maps DEBUG=any cucumber-js test/integration',
      'test:integration:debug': 'DEBUG=test run-s test:integration',
      'test:integration:wip': 'run-s \'test:integration:base -- --profile wip\'',
      'test:integration:wip:debug': 'DEBUG=test run-s \'test:integration:wip\'',
      'test:integration:focus': 'run-s \'test:integration:base -- --profile focus\''
    });
  });
});
