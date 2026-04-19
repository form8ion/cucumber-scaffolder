import deepmerge from 'deepmerge';

import {remove as removeGherkinLint} from './gherkin-lint/index.js';
import {scaffold as scaffoldGplint} from './gplint/index.js';

export default async function liftLinting({projectRoot}) {
  const [scaffoldResults, removalResults] = await Promise.all([
    scaffoldGplint({projectRoot}),
    removeGherkinLint({projectRoot})
  ]);

  return deepmerge(removalResults, scaffoldResults);
}
