import deepmerge from 'deepmerge';

import {lift as liftCucumber} from './cucumber/index.js';
import {lift as liftLinting} from './lint/index.js';

export default async function lift({projectRoot, packageDetails}) {
  const [cucumberResults, lintingResults] = await Promise.all([
    liftCucumber({projectRoot, packageDetails}),
    liftLinting({projectRoot})
  ]);

  return deepmerge(cucumberResults, lintingResults);
}
