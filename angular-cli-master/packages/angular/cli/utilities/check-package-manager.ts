/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { terminal } from '@angular-devkit/core';
import { exec } from 'child_process';
import { promisify } from 'util';
import { getPackageManager } from './config';

const execPromise = promisify(exec);
const packageManager = getPackageManager();


export function checkYarnOrCNPM() {

  // Don't show messages if user has already changed the default.
  if (packageManager !== 'default') {
    return Promise.resolve();
  }

  return Promise
      .all([checkYarn(), checkCNPM()])
      .then((data: Array<boolean>) => {
        const [isYarnInstalled, isCNPMInstalled] = data;
        if (isYarnInstalled && isCNPMInstalled) {
          console.log(terminal.yellow('You can `ng config -g cli.packageManager yarn` '
            + 'or `ng config -g cli.packageManager cnpm`.'));
        } else if (isYarnInstalled) {
          console.log(terminal.yellow('You can `ng config -g cli.packageManager yarn`.'));
        } else if (isCNPMInstalled) {
          console.log(terminal.yellow('You can `ng config -g cli.packageManager cnpm`.'));
        } else  {
          if (packageManager !== 'default' && packageManager !== 'npm') {
            console.log(terminal.yellow(`Seems that ${packageManager} is not installed.`));
            console.log(terminal.yellow('You can `ng config -g cli.packageManager npm`.'));
          }
        }
      });
}

function checkYarn() {
  return execPromise('yarn --version')
    .then(() => true, () => false);
}

function checkCNPM() {
  return execPromise('cnpm --version')
    .then(() => true, () => false);
}
