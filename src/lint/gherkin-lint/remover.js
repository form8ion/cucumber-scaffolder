import {promises as fs} from 'node:fs';

export default async function removeGherkinLint({projectRoot}) {
  await Promise.all([
    fs.rm(`${projectRoot}/.gherkin-lintrc.json`, {force: true}),
    fs.rm(`${projectRoot}/.gherkin-lintrc`, {force: true})
  ]);

  return {dependencies: {javascript: {remove: ['gherkin-lint']}}};
}
