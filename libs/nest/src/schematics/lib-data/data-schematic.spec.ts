import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { NestSchematicSchema } from './schema'

describe('nest schematic', () => {
  let appTree: Tree
  const options: NestSchematicSchema = { name: 'test' }

  const testRunner = new SchematicTestRunner(
    '@nxpm/nest',
    join(__dirname, '../../../collection.json'),
  )

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('nest', options, appTree).toPromise(),
    ).resolves.not.toThrowError()
  })
})
