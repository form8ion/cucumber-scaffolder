import {promises as fs} from 'node:fs';
import mustache from 'mustache';

import determinePathToTemplate from '../../template-path.js';
import resolveExtensionForProjectType from '../extension-resolver.js';

export default async function scaffoldConfig({projectRoot}) {
  const extension = await resolveExtensionForProjectType({projectRoot});

  await fs.writeFile(
    `${projectRoot}/cucumber.${extension}`,
    mustache.render(await fs.readFile(determinePathToTemplate('cucumber.mustache'), 'utf-8'), {extension})
  );
}
