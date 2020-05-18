import { chain, noop, Rule, SchematicContext, Tree } from '@angular-devkit/schematics'
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks'
import { updateJsonInTree, formatFiles } from '@nrwl/workspace'
import { readFileSync } from 'fs'
import { join } from 'path'
import { huskyVersion, lintStagedVersion } from '../utils/versions'

import { Schema } from './schema'

export interface NormalizedSchema extends Schema {
  packageJson: {
    husky: {
      hooks: { [key: string]: string }
    }
    'lint-staged': {
      [key: string]: string[]
    }
  }
}
function addTasks(options: NormalizedSchema) {
  return (host: Tree, context: SchematicContext) => {
    if (!options.skipInstall) {
      context.addTask(new NodePackageInstallTask('.'))
    }
  }
}

function normalizeOptions(host: Tree, options: Schema): NormalizedSchema {
  return {
    ...options,
    packageJson: {
      husky: {
        hooks: {
          'pre-commit': 'lint-staged',
        },
      },
      'lint-staged': {
        '*.{js,json,css,scss,less,md,ts,tsx,html,component.html,graphql}': [
          'yarn affected:lint --uncommitted --fix --parallel',
          'yarn format --uncommitted',
        ],
      },
    },
  }
}

function createFiles(options: NormalizedSchema): Rule {
  const prettierIgnore = '.prettierignore'
  const prettierIgnoreContent = readFileSync(join(__dirname, 'files', prettierIgnore)).toString()
  const prettierRc = '.prettierrc'
  const prettierRcContent = readFileSync(join(__dirname, 'files', prettierRc)).toString()
  return (tree: Tree) => {
    if (tree.exists(prettierIgnore)) {
      tree.overwrite(prettierIgnore, prettierIgnoreContent)
    } else {
      tree.create(prettierIgnore, prettierIgnoreContent)
    }
    if (tree.exists(prettierRc)) {
      tree.overwrite(prettierRc, prettierRcContent)
    } else {
      tree.create(prettierRc, prettierRcContent)
    }
  }
}

function updatePackageJson(options: NormalizedSchema) {
  return updateJsonInTree(`/package.json`, (json) => {
    if (!json['devDependencies']) {
      json['devDependencies'] = {}
    }

    if (!json['devDependencies']['husky']) {
      json['devDependencies']['husky'] = huskyVersion
    }

    if (!json['devDependencies']['lint-staged']) {
      json['devDependencies']['lint-staged'] = lintStagedVersion
    }

    if (options.packageJson) {
      Object.keys(options.packageJson).forEach((key) => {
        if (!json[key]) {
          json[key] = options.packageJson[key]
        }
      })
    }
    return json
  })
}

export default function(schema: Schema): Rule {
  return (host: Tree) => {
    const options = normalizeOptions(host, schema)

    return chain([
      addTasks(options),
      createFiles(options),
      updatePackageJson(options),
      options.skipFormat ? noop() : formatFiles(schema),
    ])
  }
}
