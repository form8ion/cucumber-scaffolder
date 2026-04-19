import {write} from '@form8ion/config-file';
import {fileTypes} from '@form8ion/core';

export default async function scaffoldGherkinLint({projectRoot}) {
  await write({
    path: projectRoot,
    name: 'gplint',
    format: fileTypes.JSON,
    config: {
      'no-restricted-tags': ['error', {tags: ['@focus']}],
      'use-and': 'error',
      'no-multiple-empty-lines': 'error',
      'no-dupe-feature-names': 'error'
    }
  });

  return {
    dependencies: {javascript: {development: ['gplint']}},
    scripts: {'lint:gherkin': 'gplint --config .gplintrc.json'}
  };
}
