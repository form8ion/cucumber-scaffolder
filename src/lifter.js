import {scaffold as scaffoldRunConfigurations, test as jetbrainsIdeIsDetected} from './run-configuration/index.js';

export default async function lift({projectRoot, packageDetails}) {
  if (await jetbrainsIdeIsDetected({projectRoot})) {
    await scaffoldRunConfigurations({projectRoot, packageDetails});
  }

  return {};
}
