import {write} from '@form8ion/config-file';
import {fileTypes} from '@form8ion/core';

export default async function ({projectRoot}) {
  await write({
    path: projectRoot,
    name: 'gherkin-lint',
    format: fileTypes.JSON,
    config: {
      'no-restricted-tags': ['on', {tags: ['@focus']}],
      'use-and': 'on',
      'no-multiple-empty-lines': 'on',
      'no-dupe-feature-names': 'on'
    }
  });

  return {
    dependencies: {javascript: {development: ['gherkin-lint']}},
    scripts: {'lint:gherkin': 'gherkin-lint --config=.gherkin-lintrc.json'}
  };
}
