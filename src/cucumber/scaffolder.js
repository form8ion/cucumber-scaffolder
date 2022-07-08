import {promises as fs} from 'node:fs';

import mustache from 'mustache';

import determinePathToTemplate from '../template-path';

export default async function ({projectRoot}) {
  await fs.writeFile(
    `${projectRoot}/cucumber.js`,
    mustache.render(await fs.readFile(determinePathToTemplate('cucumber.mjs'), 'utf-8'))
  );
}
