import { strings } from '@angular-devkit/core'
import {
  apply,
  applyTemplates,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics'
import {
  insert,
  names,
  offsetFromRoot,
  projectRootDir,
  ProjectType,
  toFileName,
} from '@nrwl/workspace'
import { InsertChange } from '@nrwl/workspace/src/utils/ast-utils'
import { readJSONSync } from 'fs-extra'
import { join } from 'path'
import { BaseSchema } from './schemas/base-schema'
import { NormalizedSchema } from './schemas/normalized-schema'

export function lineEnd(content: string) {
  return `${content}\n`
}

export function appendToPath(path, line: string | string[]): Rule {
  const lines = Array.isArray(line) ? line : [line]
  const content = lineEnd(lines.join('\n'))
  return (tree: Tree) => {
    const source = tree.read(path).toString()
    return insert(tree, path, [new InsertChange(path, source.length, content)])
  }
}

export function addFiles(options: NormalizedSchema): Rule {
  return mergeWith(
    apply(url(`./files`), [
      template({
        ...strings,
        ...options,
        tmpl: '',
      }),
      applyTemplates({
        ...options,
        ...names(options.name),
        offsetFromRoot: offsetFromRoot(options.projectRoot),
      }),
      move(options.projectRoot),
    ]),
    MergeStrategy.Overwrite,
  )
}

export function addTargetToProject(project, target) {
  return project.targets.add(target)
}

export function addTargetsToProject(project, targets: unknown[]) {
  return targets.map((t) => addTargetToProject(project, t))
}

export function createOrOverwrite(path, line: string | string[]): Rule {
  const lines = Array.isArray(line) ? line : [line]
  return (tree: Tree) => {
    const content = lineEnd(lines.join('\n'))
    tree.exists(path) ? tree.overwrite(path, content) : tree.create(path, content)
    return tree
  }
}

export function createRunCommand(name, commands: string | string[]) {
  commands = Array.isArray(commands) ? commands : [commands]
  return {
    name,
    builder: '@nrwl/workspace:run-commands',
    options: {
      parallel: false,
      commands: commands.map((command) => ({ command })),
    },
  }
}

export function normalizeOptions<T extends BaseSchema>(
  options: T,
  projectType: ProjectType,
): NormalizedSchema {
  const name = toFileName(options.name)
  const nxJson = readJSONSync(join(process.cwd(), 'nx.json'))
  const projectDirectory = options.directory ? `${toFileName(options.directory)}/${name}` : name
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-')
  const projectRoot = `${projectRootDir(projectType)}/${projectDirectory}`
  const parsedTags = options.tags ? options.tags.split(',').map((s) => s.trim()) : []

  return {
    ...options,
    npmScope: nxJson.npmScope,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
  }
}

export function removeFiles(files: string[]): Rule {
  return function (tree: Tree) {
    for (const file of files) {
      tree.delete(file)
    }
    return tree
  }
}
