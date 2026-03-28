import {scaffold as scaffoldRunConfigurations, test as jetbrainsIdeIsDetected} from './run-configuration/index.js';

export default async function lift({projectRoot}) {
  if (await jetbrainsIdeIsDetected({projectRoot})) {
    await scaffoldRunConfigurations({projectRoot});
  }

  return {};
}
