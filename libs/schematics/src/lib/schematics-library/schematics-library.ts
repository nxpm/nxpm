import { normalize, Path } from '@angular-devkit/core'
import {
  apply,
  chain,
  externalSchematic,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics'
import {
  deleteFile,
  names,
  offsetFromRoot,
  toFileName,
  updateJsonInTree,
  updateWorkspaceInTree,
} from '@nrwl/workspace'
import { angularVersion, nxVersion, typescriptVersion } from '../utils/versions'

import { Schema } from './schema'

export interface NormalizedSchema extends Schema {
  name: string
  fileName: string
  projectRoot: Path
}

function normalizeOptions(host: Tree, options: Schema): NormalizedSchema {
  const name = toFileName(options.name)
  const projectDirectory = options.directory ? `${toFileName(options.directory)}/${name}` : name

  const fileName = projectDirectory.replace(new RegExp('/', 'g'), '-')
  const projectRoot = normalize(`libs/${projectDirectory}`)

  return {
    ...options,
    name,
    fileName,
    projectRoot,
  }
}

function createFiles(options: NormalizedSchema): Rule {
  return mergeWith(
    apply(url(`./files/lib`), [
      template({
        ...options,
        ...names(options.name),
        tmpl: '',
        offsetFromRoot: offsetFromRoot(options.projectRoot),
      }),
      move(options.projectRoot),
    ]),
    MergeStrategy.Overwrite,
  )
}

function addAssets(options: NormalizedSchema): Rule {
  return updateWorkspaceInTree(json => {
    const architect = json.projects[options.name]?.architect
    if (architect) {
      architect.build = {
        ...architect.build,
        options: {
          ...architect.build.options,
          assets: [
            ...architect.build.options.assets,
            {
              glob: '**/*.json',
              input: `libs/${options.name}/src/lib`,
              output: './lib/',
            },
            {
              glob: '**/*.*__tmpl__',
              input: `libs/${options.name}/src/lib`,
              output: './lib/',
            },
          ],
        },
      }
    }
    return json
  })
}

function updatePackageJson(options: NormalizedSchema) {
  return updateJsonInTree(`${options.projectRoot}/package.json`, json => {
    if (!json['dependencies']) {
      json['dependencies'] = {}
    }
    if (!json['dependencies']['@angular/upgrade']) {
      json['dependencies']['@angular-devkit/core'] = angularVersion
      json['dependencies']['@angular-devkit/schematics'] = angularVersion
      json['dependencies']['@nrwl/node'] = nxVersion
      json['dependencies']['@schematics/angular'] = angularVersion
      json['dependencies']['typescript'] = typescriptVersion
    }

    if (!json['schematics']) {
      json['schematics'] = './lib/collection.json'
    }
    return json
  })
}

function removeExportFromBarrelFile(options: NormalizedSchema): Rule {
  return (host: Tree) => {
    const indexFilePath = `${options.projectRoot}/src/index.ts`
    const buffer = host.read(indexFilePath)
    if (buffer) {
      host.overwrite(indexFilePath, '')
    }
  }
}

function deleteFilesFast(paths: string | string[]): Rule {
  paths = Array.isArray(paths) ? paths : [paths];
  return (tree: Tree) => {
    for (const path of paths) {
      if (tree.exists(path)) {
        tree.delete(path);
      }
    }
  };
}

export default function(schema: Schema): Rule {
  return (host: Tree) => {
    const options = normalizeOptions(host, schema)

    return chain([
      externalSchematic('@nrwl/node', 'library', {
        ...schema,
        publishable: true,
      }),
      createFiles(options),
      addAssets(options),
      updatePackageJson(options),
      removeExportFromBarrelFile(options),
      deleteFilesFast([
        `/${options.projectRoot}/src/lib/${options.fileName}.spec.ts`,
        `/${options.projectRoot}/src/lib/${options.fileName}.ts`,
      ]),
    ])
  }
}
