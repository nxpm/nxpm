import {
  apply,
  applyTemplates,
  chain,
  externalSchematic,
  mergeWith,
  move,
  Rule,
  schematic,
  url,
} from '@angular-devkit/schematics'
import {
  addDepsToPackageJson,
  addProjectToNxJsonInTree,
  names,
  offsetFromRoot,
  projectRootDir,
  ProjectType,
  toFileName,
  updateWorkspace,
} from '@nrwl/workspace'

import { NestSchematicSchema } from './schema'

/**
 * Depending on your needs, you can change this to either `Library` or `Application`
 */
const projectType = ProjectType.Application

interface NormalizedSchema extends NestSchematicSchema {
  projectName: string
  projectRoot: string
  projectDirectory: string
  parsedTags: string[]
}

function normalizeOptions(options: NestSchematicSchema): NormalizedSchema {
  const name = toFileName(options.name)
  const projectDirectory = options.directory ? `${toFileName(options.directory)}/${name}` : name
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-')
  const projectRoot = `${projectRootDir(projectType)}/${projectDirectory}`
  const parsedTags = options.tags ? options.tags.split(',').map((s) => s.trim()) : []

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
  }
}

function addFiles(options: NormalizedSchema): Rule {
  return mergeWith(
    apply(url(`./files`), [
      applyTemplates({
        ...options,
        ...names(options.name),
        offsetFromRoot: offsetFromRoot(options.projectRoot),
      }),
      move(options.projectRoot),
    ]),
  )
}

export default function(options: NestSchematicSchema): Rule {
  const normalizedOptions = normalizeOptions(options)
  return chain([
    updateWorkspace((workspace) => {
      workspace.projects
        .add({
          name: normalizedOptions.projectName,
          root: normalizedOptions.projectRoot,
          sourceRoot: `${normalizedOptions.projectRoot}/src`,
          projectType,
        })
        .targets.add({
          name: 'build',
          builder: '@nxpm/nest:build',
        })
    }),
    addProjectToNxJsonInTree(normalizedOptions.projectName, { tags: normalizedOptions.parsedTags }),
    // addFiles(normalizedOptions),
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
      true
    ),
    externalSchematic('@nrwl/nest', 'application', {
      name: 'api',
    }),
    schematic('lib-auth', { name: 'auth' }),
    schematic('lib-core', { name: 'core' }),
    schematic('lib-data', { name: 'data' }),
    // schematic('lib-core', {}),
    // schematic('lib-data', {}),
  ])
}
