/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { ArchitectCommand, ArchitectCommandOptions } from '../models/architect-command';
import { CommandScope, Option } from '../models/command';
import { Version } from '../upgrade/version';


export default class ServeCommand extends ArchitectCommand {
  public readonly name = 'serve';
  public readonly target = 'serve';
  public readonly description = 'Builds and serves your app, rebuilding on file changes.';
  public static aliases = ['s'];
  public readonly scope = CommandScope.inProject;
  public readonly options: Option[] = [
    this.prodOption,
    this.configurationOption,
  ];

  public validate(_options: ArchitectCommandOptions) {
    // Check Angular and TypeScript versions.
    Version.assertCompatibleAngularVersion(this.project.root);
    Version.assertTypescriptVersion(this.project.root);

    return true;
  }

  public async run(options: ArchitectCommandOptions) {
    return this.runArchitectTarget(options);
  }
}
