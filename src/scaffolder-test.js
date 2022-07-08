import deepmerge from 'deepmerge';

import {assert} from 'chai';
import any from '@travi/any';
import sinon from 'sinon';

import * as cucumberScaffolder from './cucumber/scaffolder';
import * as gherkinLintScaffolder from './gherkin-lint/scaffolder';
import scaffoldCucumber from './scaffolder';

suite('cucumber scaffolder', () => {
  let sandbox;
  const projectRoot = any.string();

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(deepmerge, 'all');
    sandbox.stub(gherkinLintScaffolder, 'default');
    sandbox.stub(cucumberScaffolder, 'default');
  });

  teardown(() => sandbox.restore());

  test('that cucumber is scaffolded', async () => {
    const cucumberResults = any.simpleObject();
    const gherkinLintResults = any.simpleObject();
    const mergedResults = any.simpleObject();
    cucumberScaffolder.default.withArgs({projectRoot}).resolves(cucumberResults);
    gherkinLintScaffolder.default.withArgs({projectRoot}).resolves(gherkinLintResults);
    deepmerge.all.withArgs([cucumberResults, gherkinLintResults]).returns(mergedResults);

    const results = await scaffoldCucumber({projectRoot});

    assert.equal(results, mergedResults);
  });
});
