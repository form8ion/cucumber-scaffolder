import deepmerge from 'deepmerge';

import {scaffold as scaffoldGherkinLint} from './gherkin-lint/index.js';
import {scaffold as scaffoldCucumber} from './cucumber/index.js';

export default async function ({projectRoot}) {
  return deepmerge.all(await Promise.all([
    scaffoldCucumber({projectRoot}),
    scaffoldGherkinLint({projectRoot})
  ]));
}
