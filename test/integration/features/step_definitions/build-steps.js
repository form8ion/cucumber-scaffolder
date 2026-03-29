import {mergeIntoExistingPackageJson} from '@form8ion/javascript-core';

import {Given} from '@cucumber/cucumber';
import any from '@travi/any';

Given('the project has a build step defined in package.json', async function () {
  await mergeIntoExistingPackageJson({projectRoot: this.projectRoot, config: {scripts: {build: any.sentence()}}});
});
