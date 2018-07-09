/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { logging, terminal } from '@angular-devkit/core';
import { filter } from 'rxjs/operators';
import { runCommand } from '../../models/command-runner';
import { getProjectDetails } from '../../utilities/project';


function loadCommands() {
  return {
    // Schematics commands.
    'add': require('../../commands/add').default,
    'new': require('../../commands/new').default,
    'generate': require('../../commands/generate').default,
    'update': require('../../commands/update').default,

    // Architect commands.
    'build': require('../../commands/build').default,
    'serve': require('../../commands/serve').default,
    'test': require('../../commands/test').default,
    'e2e': require('../../commands/e2e').default,
    'lint': require('../../commands/lint').default,
    'xi18n': require('../../commands/xi18n').default,
    'run': require('../../commands/run').default,

    // Disabled commands.
    'eject': require('../../commands/eject').default,

    // Easter eggs.
    'make-this-awesome': require('../../commands/easter-egg').default,

    // Other.
    'config': require('../../commands/config').default,
    'help': require('../../commands/help').default,
    'version': require('../../commands/version').default,
    'doc': require('../../commands/doc').default,

    // deprecated
    'get': require('../../commands/getset').default,
    'set': require('../../commands/getset').default,
  };
}

export default async function(options: { testing?: boolean, cliArgs: string[] }) {
  const commands = loadCommands();

  const logger = new logging.IndentLogger('cling');
  let loggingSubscription;
  if (!options.testing) {
    loggingSubscription = initializeLogging(logger);
  }

  let projectDetails = getProjectDetails();
  if (projectDetails === null) {
    projectDetails = { root: process.cwd() };
  }
  const context = {
    project: projectDetails,
  };

  try {
    const maybeExitCode = await runCommand(commands, options.cliArgs, logger, context);
    if (typeof maybeExitCode === 'number') {
      console.assert(Number.isInteger(maybeExitCode));

      return maybeExitCode;
    }

    return 0;
  } catch (err) {
    if (err instanceof Error) {
      logger.fatal(err.message);
      if (err.stack) {
        logger.fatal(err.stack);
      }
    } else if (typeof err === 'string') {
      logger.fatal(err);
    } else if (typeof err === 'number') {
      // Log nothing.
    } else {
      logger.fatal('An unexpected error occurred: ' + JSON.stringify(err));
    }

    if (options.testing) {
      debugger;
      throw err;
    }

    if (loggingSubscription) {
      loggingSubscription.unsubscribe();
    }

    return 1;
  }
}

// Initialize logging.
function initializeLogging(logger: logging.Logger) {
  return logger
    .pipe(filter(entry => (entry.level != 'debug')))
    .subscribe(entry => {
      let color = (x: string) => terminal.dim(terminal.white(x));
      let output = process.stdout;
      switch (entry.level) {
        case 'info':
          color = terminal.white;
          break;
        case 'warn':
          color = terminal.yellow;
          break;
        case 'error':
          color = terminal.red;
          output = process.stderr;
          break;
        case 'fatal':
          color = (x) => terminal.bold(terminal.red(x));
          output = process.stderr;
          break;
      }

      output.write(color(entry.message) + '\n');
    });
}
