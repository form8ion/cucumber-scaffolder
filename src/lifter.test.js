import {describe, it, vi, expect} from 'vitest';
import {when} from 'vitest-when';
import any from '@travi/any';

import {scaffold as scaffoldRunConfigurations, test as jetbrainsIdeIsDetected} from './run-configuration/index.js';
import lift from './lifter.js';

vi.mock('./run-configuration/index.js');

describe('lifter', () => {
  const projectRoot = any.string();
  const packageDetails = any.simpleObject();

  it('should lift the cucumber details', async () => {
    when(jetbrainsIdeIsDetected).calledWith({projectRoot}).thenResolve(true);

    expect(await lift({projectRoot, packageDetails})).toEqual({});

    expect(scaffoldRunConfigurations).toHaveBeenCalledWith({projectRoot, packageDetails});
  });

  it('should not create JetBrains run configurations when no JetBrains IDE is detected', async () => {
    when(jetbrainsIdeIsDetected).calledWith({projectRoot}).thenResolve(false);

    expect(await lift({projectRoot})).toEqual({});

    expect(scaffoldRunConfigurations).not.toHaveBeenCalled();
  });
});
