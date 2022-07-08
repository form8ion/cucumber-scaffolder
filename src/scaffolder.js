import deepmerge from 'deepmerge';

import {scaffold as scaffoldGherkinLint} from './gherkin-lint';
import {scaffold as scaffoldCucumber} from './cucumber';

export default async function ({projectRoot}) {
  return deepmerge.all(await Promise.all([
    scaffoldCucumber({projectRoot}),
    scaffoldGherkinLint({projectRoot})
  ]));
}
