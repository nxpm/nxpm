import { apply, applyTemplates, chain, mergeWith, move, Rule, url } from '@angular-devkit/schematics'
import {
  addDepsToPackageJson,
  addProjectToNxJsonInTree, formatFiles,
  names,
  offsetFromRoot,
  projectRootDir,
  ProjectType,
  toFileName,
  updateWorkspace,
} from '@nrwl/workspace'
import { ReactNativeSchematicSchema } from './schema'

/**
 * Depending on your needs, you can change this to either `Library` or `Application`
 */
const projectType = ProjectType.Application

interface NormalizedSchema extends ReactNativeSchematicSchema {
  projectName: string
  projectRoot: string
  projectDirectory: string
  parsedTags: string[]
}

const pages = {
  "name": "Sandbox",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "start": "react-native start",
    "test": "jest",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx"
  },
  "dependencies": {

  },
  "devDependencies": {

  }
}

function normalizeOptions(options: ReactNativeSchematicSchema): NormalizedSchema {
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

export default function(options: ReactNativeSchematicSchema): Rule {
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
          builder: '@nxpm/react-native:build',
        })
    }),
    addProjectToNxJsonInTree(normalizedOptions.projectName, { tags: normalizedOptions.parsedTags }),
    addFiles(normalizedOptions),
    addDepsToPackageJson(
      {
        "react": "16.11.0",
        "react-native": "0.62.2",
      },
      {
        "@babel/core": "^7.6.2",
        "@babel/runtime": "^7.6.2",
        "@types/react-native": "^0.62.0",
        "@types/react-test-renderer": "16.9.2",
        "metro-react-native-babel-preset": "^0.58.0",
        "react-test-renderer": "16.11.0",
      },
      true
    ),
    formatFiles(options)
  ])
}
