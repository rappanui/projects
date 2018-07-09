/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// We disable implicit dependenccies because those are only for typings and don't have a runtime
// equivalent.
// tslint:disable-next-line:no-global-tslint-disable
// tslint:disable:no-implicit-dependencies
import * as ngc from '@angular/compiler-cli';
import * as ngtools from '@angular/compiler-cli/ngtools2';
import * as path from 'path';
import * as ts from 'typescript';

export const DEFAULT_ERROR_CODE = 100;
export const UNKNOWN_ERROR_CODE = 500;
export const SOURCE = 'angular' as 'angular';

export type CompilerOptions = ngc.CompilerOptions;
export type CompilerHost = ngtools.CompilerHost;
export type Program = ngtools.Program;
export type Diagnostic = ngtools.Diagnostic;
export type Diagnostics = ReadonlyArray<ts.Diagnostic | Diagnostic>;

function _error(api: string, fn: string): never {
  throw new Error('Could not find API ' + api + ', function ' + fn);
}

function getApiMember<T, K extends keyof T>(
  api: T | null,
  func: K,
  apiName: string,
): T[K] {
  return api && api[func] || _error(apiName, func.toString());
}

// Manually check for Compiler CLI availability and supported version.
// This is needed because @ngtools/webpack does not depend directly on @angular/compiler-cli, since
// it is installed as part of global Angular CLI installs and compiler-cli is not of its
// dependencies.
export function CompilerCliIsSupported() {
  let version;

  // Check that Angular is available.
  try {
    version = (require('@angular/compiler-cli') as typeof ngc).VERSION;
  } catch (e) {
    throw new Error('The "@angular/compiler-cli" package was not properly installed. Error: ' + e);
  }

  // Check that Angular is also not part of this module's node_modules (it should be the project's).
  const compilerCliPath = require.resolve('@angular/compiler-cli');
  if (compilerCliPath.startsWith(path.dirname(__dirname))) {
    throw new Error('The @ngtools/webpack plugin now relies on the project @angular/compiler-cli. '
      + 'Please clean your node_modules and reinstall.');
  }

  // Throw if we're less than 5.x
  if (Number(version.major) < 5) {
    throw new Error('Version of @angular/compiler-cli needs to be 5.0.0 or greater. '
      + `Current version is "${version.full}".`);
  }
}

// These imports do not exist on a global install for Angular CLI, so we cannot use a static ES6
// import.
let compilerCli: typeof ngc | null = null;
try {
  compilerCli = require('@angular/compiler-cli');
} catch {
  // Don't throw an error if the private API does not exist.
  // Instead, the `CompilerCliIsSupported` method should return throw and indicate the
  // plugin cannot be used.
}

export const VERSION: typeof ngc.VERSION = getApiMember(compilerCli, 'VERSION', 'compiler-cli');
export const __NGTOOLS_PRIVATE_API_2 = getApiMember(
  compilerCli,
  '__NGTOOLS_PRIVATE_API_2',
  'compiler-cli',
);
export const readConfiguration = getApiMember(compilerCli, 'readConfiguration', 'compiler-cli');

// These imports do not exist on Angular versions lower than 5, so we cannot use a static ES6
// import.
let ngtools2: typeof ngtools | null = null;
try {
  ngtools2 = require('@angular/compiler-cli/ngtools2');
} catch {
  // Don't throw an error if the private API does not exist.
}

export const createProgram = getApiMember(ngtools2, 'createProgram', 'ngtools2');
export const createCompilerHost = getApiMember(ngtools2, 'createCompilerHost', 'ngtools2');
export const formatDiagnostics = getApiMember(ngtools2, 'formatDiagnostics', 'ngtools2');
export const EmitFlags = getApiMember(ngtools2, 'EmitFlags', 'ngtools2');
