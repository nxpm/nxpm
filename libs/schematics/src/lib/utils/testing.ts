import { join } from 'path'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { Rule, Tree } from '@angular-devkit/schematics'

const testRunner = new SchematicTestRunner(
  '@nxplus/schematics',
  join(__dirname, '../collection.json'),
)

export function runSchematic(schematicName: string, options: any, tree: Tree) {
  return testRunner.runSchematicAsync(schematicName, options, tree).toPromise()
}

export function runExternalSchematic(
  collection: string,
  schematicName: string,
  options: any,
  tree: Tree,
) {
  return testRunner.runExternalSchematicAsync(collection, schematicName, options, tree).toPromise()
}

export function callRule(rule: Rule, tree: Tree) {
  return testRunner.callRule(rule, tree).toPromise()
}
