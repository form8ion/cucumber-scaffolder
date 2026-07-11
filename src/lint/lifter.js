import {promises as fs} from 'node:fs';
import deepmerge from 'deepmerge';
import {fileExists} from '@form8ion/core';

import {remove as removeGherkinLint} from './gherkin-lint/index.js';
import {scaffold as scaffoldGplint} from './gplint/index.js';

async function removeGitkeep(projectRoot) {
  const stepDefinitionsDirectory = `${projectRoot}/test/integration/features/step_definitions`;
  const gitKeepPath = `${stepDefinitionsDirectory}/.gitkeep`;

  if (await fileExists(gitKeepPath)) {
    const files = await fs.readdir(stepDefinitionsDirectory);

    if (files.some(file => '.gitkeep' !== file)) {
      await fs.rm(gitKeepPath);
    }
  }
}

export default async function liftLinting({projectRoot}) {
  const [scaffoldResults, removalResults] = await Promise.all([
    scaffoldGplint({projectRoot}),
    removeGherkinLint({projectRoot}),
    removeGitkeep(projectRoot)
  ]);

  return deepmerge(removalResults, scaffoldResults);
}
