/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// tslint:disable:no-implicit-dependencies
import { logging } from '@angular-devkit/core';


const { packages } = require('../lib/packages');


export default function(_: {}, logger: logging.Logger) {
  logger.info(JSON.stringify(packages, null, 2));
}
