import { chain, externalSchematic, Rule, schematic } from '@angular-devkit/schematics'
import { addDepsToPackageJson, ProjectType } from '@nrwl/workspace'
import { addFiles, normalizeOptions, removeFiles } from '../utils'
import { AppSchematicSchema } from './schema'

export default function (options: AppSchematicSchema): Rule {
  const normalizedOptions = normalizeOptions<AppSchematicSchema>(options, ProjectType.Application)
  return chain([
    addDepsToPackageJson(
      {
        '@nestjs/common': '^7.0.0',
        '@nestjs/core': '^7.0.0',
        '@nestjs/platform-express': '^7.0.0',
      },
      {
        '@nestjs/schematics': '^7.0.0',
        '@nestjs/testing': '^7.0.0',
      },
      true,
    ),
    externalSchematic('@nrwl/nest', 'application', {
      name: options.name,
    }),
    addFiles(normalizedOptions),
    removeFiles([
      `${normalizedOptions.projectRoot}/src/app/.gitkeep`,
      `${normalizedOptions.projectRoot}/src/app/app.controller.ts`,
      `${normalizedOptions.projectRoot}/src/app/app.controller.spec.ts`,
      `${normalizedOptions.projectRoot}/src/app/app.service.ts`,
      `${normalizedOptions.projectRoot}/src/app/app.service.spec.ts`,
    ]),
    schematic('lib-auth', { name: 'auth', directory: options.name }),
    schematic('lib-core', { name: 'core', directory: options.name }),
    schematic('lib-data', { name: 'data', directory: options.name }),
  ])
}
