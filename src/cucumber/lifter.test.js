import {beforeEach, describe, it, vi, expect} from 'vitest';
import {when} from 'vitest-when';
import any from '@travi/any';

import {lift as liftScripts} from './scripts/index.js';
import {scaffold as scaffoldRunConfigurations, test as jetbrainsIdeIsDetected} from './run-configurations/index.js';
import lift from './lifter.js';

vi.mock('./scripts/index.js');
vi.mock('./run-configurations/index.js');

describe('lifter', () => {
  const projectRoot = any.string();
  const packageDetails = any.simpleObject();
  const scriptsResults = any.simpleObject();

  beforeEach(() => {
    when(liftScripts).calledWith({packageDetails}).thenReturn(scriptsResults);
  });

  it('should lift the cucumber details', async () => {
    when(jetbrainsIdeIsDetected).calledWith({projectRoot}).thenResolve(true);

    expect(await lift({projectRoot, packageDetails})).toEqual(scriptsResults);

    expect(scaffoldRunConfigurations).toHaveBeenCalledWith({projectRoot, packageDetails});
  });

  it('should not create JetBrains run configurations when no JetBrains IDE is detected', async () => {
    when(jetbrainsIdeIsDetected).calledWith({projectRoot}).thenResolve(false);

    expect(await lift({projectRoot, packageDetails})).toEqual(scriptsResults);

    expect(scaffoldRunConfigurations).not.toHaveBeenCalled();
  });
});
