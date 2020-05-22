import { chain, externalSchematic, Rule } from '@angular-devkit/schematics'
import { addDepsToPackageJson, ProjectType } from '@nrwl/workspace'
import { addFiles, addPrismaScripts, normalizeOptions } from '../utils'
import { appendDotEnv } from '../utils/helpers/dot-env'
import { LibDataSchematicSchema } from './schema'

export default function (options: LibDataSchematicSchema): Rule {
  const normalizedOptions = normalizeOptions<LibDataSchematicSchema>(options, ProjectType.Library)

  return chain([
    externalSchematic('@nrwl/nest', 'library', {
      directory: options.directory,
      name: options.name,
      publishable: true,
    }),
    addFiles(normalizedOptions),
    addDepsToPackageJson(
      {
        '@prisma/client': '2.0.0-beta.5',
      },
      {},
      true,
    ),
    addPrismaScripts(normalizedOptions),
    appendDotEnv([
      `# Uncomment this line if you want to use Postgres`,
      `# DATABASE_URL=postgresql://prisma:prisma@localhost:5432/prisma?schema=${options.name}`,
    ]),
  ])
}
