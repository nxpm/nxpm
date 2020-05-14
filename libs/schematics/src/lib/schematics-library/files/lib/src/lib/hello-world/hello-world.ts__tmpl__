import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

export default function (options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('My Schematic: ' + JSON.stringify(options));

    tree.create('hello', 'world');

    return tree;
  };
}
