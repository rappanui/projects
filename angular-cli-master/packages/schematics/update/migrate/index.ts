/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { JsonObject } from '@angular-devkit/core';
import {
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
  chain,
  externalSchematic,
} from '@angular-devkit/schematics';
import * as semver from 'semver';
import { PostUpdateSchema } from './schema';


export default function(options: PostUpdateSchema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const schematicsToRun: { name: string; version: string; }[] = [];

    // Create the collection for the package.
    const collection = context.engine.createCollection(options.collection);
    for (const name of collection.listSchematicNames()) {
      const schematic = collection.createSchematic(name, true);

      const description: JsonObject = schematic.description as JsonObject;

      if (typeof description['version'] == 'string') {
        let version = description['version'] as string;
        if (!version.match(/^\d{1,30}\.\d{1,30}\.\d{1,30}$/)) {
          version += '.0';
        }
        if (!version.match(/^\d{1,30}\.\d{1,30}\.\d{1,30}$/)) {
          version += '.0';
        }
        if (!semver.valid(version)) {
          throw new SchematicsException(
            `Invalid migration version: ${JSON.stringify(description['version'])}`,
          );
        }

        if (semver.gt(version, options.from) && semver.lte(version, options.to)) {
          schematicsToRun.push({ name, version });
        }
      }
    }

    schematicsToRun.sort((a, b) => {
      const cmp = semver.compare(a.version, b.version);

      // Revert to comparing the names of the collection if the versions are equal.
      return cmp == 0 ? a.name.localeCompare(b.name) : cmp;
    });

    if (schematicsToRun.length > 0) {
      const rules = schematicsToRun.map(x => externalSchematic(options.collection, x.name, {}));

      return chain(rules);
    }

    return tree;
  };
}
