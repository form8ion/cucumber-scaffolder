import {lift as liftScripts} from './scripts/index.js';
import {scaffold as scaffoldRunConfigurations, test as jetbrainsIdeIsDetected} from './run-configurations/index.js';

export default async function liftCucumber({projectRoot, packageDetails}) {
  if (await jetbrainsIdeIsDetected({projectRoot})) {
    await scaffoldRunConfigurations({projectRoot, packageDetails});
  }

  return liftScripts({packageDetails});
}
