import {lift as liftCucumber} from './cucumber/index.js';

export default function lift({projectRoot, packageDetails}) {
  return liftCucumber({projectRoot, packageDetails});
}
