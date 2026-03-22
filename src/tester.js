import {fileExists} from '@form8ion/core';

export default async function cucumberInUse({projectRoot}) {
  const [jsConfigExists, mjsConfigExists] = await Promise.all([
    fileExists(`${projectRoot}/cucumber.js`),
    fileExists(`${projectRoot}/cucumber.mjs`)
  ]);

  return jsConfigExists || mjsConfigExists;
}
