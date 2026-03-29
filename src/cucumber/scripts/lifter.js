function projectHasBuildStep(packageDetails) {
  return !!packageDetails.scripts.build;
}

export default function liftScripts({packageDetails}) {
  if (projectHasBuildStep(packageDetails)) {
    return {scripts: {'pretest:integration:base': 'run-s build'}};
  }

  return {};
}
