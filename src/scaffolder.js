import deepmerge from 'deepmerge';

import {scaffold as scaffoldLint} from './lint/index.js';
import {scaffold as scaffoldCucumber} from './cucumber/index.js';

export default async function scaffold({projectRoot}) {
  return deepmerge.all(await Promise.all([
    scaffoldCucumber({projectRoot}),
    scaffoldLint({projectRoot})
  ]));
}
