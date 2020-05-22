import { chain, externalSchematic, Rule } from '@angular-devkit/schematics'
import { addDepsToPackageJson, ProjectType } from '@nrwl/workspace'
import { addFiles, normalizeOptions } from '../utils'
import { createDotEnv } from '../utils/helpers/dot-env'
import { LibCoreSchematicSchema } from './schema'

export default function (options: LibCoreSchematicSchema): Rule {
  const normalizedOptions = normalizeOptions<LibCoreSchematicSchema>(options, ProjectType.Library)

  return chain([
    externalSchematic('@nrwl/nest', 'library', {
      directory: options.directory,
      name: options.name,
      publishable: true,
    }),
    addFiles(normalizedOptions),
    addDepsToPackageJson(
      {
        '@hapi/joi': '^17.1.1',
        '@kikstart-playground/graphql-intercom': '1.4.1',
        '@nestjs/config': '^0.4.2',
        '@nestjs/graphql': '^7.0.0',
        'apollo-server-express': '^2.13.0',
        'graphql-type-json': '0.3.1',
      },
      {},
      true,
    ),
    createDotEnv([`NODE_ENV=development`, `PORT=3000`]),
  ])
}
