import { Tree } from '@angular-devkit/schematics'
import { NxJson, readJsonInTree } from '@nrwl/workspace'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { runSchematic } from '../utils/testing'

describe('lib', () => {
  let appTree: Tree

  beforeEach(async () => {
    appTree = Tree.empty()
    appTree = createEmptyWorkspace(appTree)
    // appTree = await runExternalSchematic('@nrwl/node', '')
  })

  describe('not nested', () => {
    it('should update workspace.json', async () => {
      const tree = await runSchematic('schematics-library', { name: 'myLib' }, appTree)
      const workspaceJson = readJsonInTree(tree, '/workspace.json')

      expect(workspaceJson.projects['my-lib'].root).toEqual('libs/my-lib')
      expect(workspaceJson.projects['my-lib'].architect.build).toBeDefined()

      const assets = workspaceJson.projects['my-lib'].architect.build.options.assets
      expect(assets.length).toEqual(3)

      expect(assets[1]).toEqual({
        glob: '**/*.json',
        input: 'libs/my-lib/src/lib',
        output: './lib/',
      })
      expect(assets[2]).toEqual({
        glob: '**/*.*__tmpl__',
        input: 'libs/my-lib/src/lib',
        output: './lib/',
      })
    })

    it('should remove the default file from @nrwl/node:lib', async () => {
      const tree = await runSchematic(
        'schematics-library',
        { name: 'myLib', global: true },
        appTree,
      )
      expect(tree.exists('libs/my-lib/src/lib/my-lib.spec.ts')).toBeFalsy()
      expect(tree.exists('libs/my-lib/src/lib/my-lib.ts')).toBeFalsy()
    })

    it('should empty the main barrel file from @nrwl/node:lib', async () => {
      const tree = await runSchematic(
        'schematics-library',
        { name: 'myLib', global: true },
        appTree,
      )
      expect(tree.readContent('libs/my-lib/src/main.ts')).toBe('')
    })

    it('should update nx.json', async () => {
      const tree = await runSchematic(
        'schematics-library',
        { name: 'myLib', tags: 'one,two' },
        appTree,
      )
      const nxJson = readJsonInTree<NxJson>(tree, '/nx.json')
      expect(nxJson.projects).toEqual({
        'my-lib': {
          tags: ['one', 'two'],
        },
      })
    })

    it('should update root tsconfig.json', async () => {
      const tree = await runSchematic('schematics-library', { name: 'myLib' }, appTree)
      const tsconfigJson = readJsonInTree(tree, '/tsconfig.json')
      expect(tsconfigJson.compilerOptions.paths['@proj/my-lib']).toEqual([
        'libs/my-lib/src/index.ts',
      ])
    })

    it('should create a local tsconfig.json', async () => {
      const tree = await runSchematic('schematics-library', { name: 'myLib' }, appTree)
      const tsconfigJson = readJsonInTree(tree, 'libs/my-lib/tsconfig.json')
      expect(tsconfigJson).toEqual({
        extends: '../../tsconfig.json',
        compilerOptions: {
          types: ['node', 'jest'],
        },
        include: ['**/*.ts'],
      })
    })

    it('should extend the local tsconfig.json with tsconfig.spec.json', async () => {
      const tree = await runSchematic('schematics-library', { name: 'myLib' }, appTree)
      const tsconfigJson = readJsonInTree(tree, 'libs/my-lib/tsconfig.spec.json')
      expect(tsconfigJson.extends).toEqual('./tsconfig.json')
    })

    it('should extend the local tsconfig.json with tsconfig.lib.json', async () => {
      const tree = await runSchematic('schematics-library', { name: 'myLib' }, appTree)
      const tsconfigJson = readJsonInTree(tree, 'libs/my-lib/tsconfig.lib.json')
      expect(tsconfigJson.extends).toEqual('./tsconfig.json')
    })

    it('should generate files', async () => {
      const tree = await runSchematic('schematics-library', { name: 'myLib' }, appTree)
      expect(tree.exists(`libs/my-lib/jest.config.js`)).toBeTruthy()
      expect(tree.exists('libs/my-lib/src/index.ts')).toBeTruthy()
      expect(tree.exists(`libs/my-lib/src/lib/my-lib.spec.ts`)).toBeFalsy()
    })
  })

  describe('publishable package', () => {
    it('should update package.json', async () => {
      const publishableTree = await runSchematic('schematics-library', { name: 'mylib' }, appTree)

      const packageJsonContent = readJsonInTree(publishableTree, 'libs/mylib/package.json')

      expect(packageJsonContent.name).toEqual('@proj/mylib')
    })
  })

  describe('schematics', () => {
    it('should create collection.json', async () => {
      const tree = await runSchematic('schematics-library', { name: 'mylib' }, appTree)

      const packageJsonContent = readJsonInTree(tree, 'libs/mylib/src/lib/collection.json')

      expect(packageJsonContent).toMatchSnapshot()
    })
    it('should create hello-world template', async () => {
      const tree = await runSchematic('schematics-library', { name: 'mylib' }, appTree)

      expect(tree.exists(`libs/my-lib/src/lib/hello-world/hello-world.spec.ts`)).toBeFalsy()
      expect(tree.exists(`libs/my-lib/src/lib/hello-world/hello-world.ts`)).toBeFalsy()
    })
  })
})
