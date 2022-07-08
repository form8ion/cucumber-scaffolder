import {promises as fs} from 'node:fs';

export default async function ({projectRoot}) {
  const {type} = JSON.parse(await fs.readFile(`${projectRoot}/package.json`, 'utf-8'));

  if ('module' === type) return 'js';

  return 'mjs';
}
