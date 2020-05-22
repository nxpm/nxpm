import { chain, externalSchematic, Rule } from '@angular-devkit/schematics'
import { addDepsToPackageJson, ProjectType } from '@nrwl/workspace'
import { addFiles, normalizeOptions } from '../utils'
import { LibAuthSchematicSchema } from './schema'

export default function (options: LibAuthSchematicSchema): Rule {
  const normalizedOptions = normalizeOptions<LibAuthSchematicSchema>(options, ProjectType.Library)

  return chain([
    externalSchematic('@nrwl/nest', 'library', {
      directory: options.directory,
      name: options.name,
      publishable: true,
    }),
    addFiles(normalizedOptions),
    addDepsToPackageJson(
      {
        '@nestjs/jwt': '^7.0.0',
        '@nestjs/passport': '^7.0.0',
        'passport-jwt': '^4.0.0',
        passport: '^0.4.1',
        bcryptjs: '2.4.3',
      },
      {},
      true,
    ),
  ])
}
