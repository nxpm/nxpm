import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing'
describe('nest e2e', () => {
  it('should create nest', async (done) => {
    const plugin = uniq('nest')
    ensureNxProject('@nxpm/nest', 'dist/libs/nest')
    await runNxCommandAsync(`generate @nxpm/nest:nest ${plugin}`)

    const result = await runNxCommandAsync(`build ${plugin}`)
    expect(result.stdout).toContain('Builder ran')

    done()
  })

  describe('--directory', () => {
    it('should create src in the specified directory', async (done) => {
      const plugin = uniq('nest')
      ensureNxProject('@nxpm/nest', 'dist/libs/nest')
      await runNxCommandAsync(`generate @nxpm/nest:nest ${plugin} --directory subdir`)
      expect(() => checkFilesExist(`libs/subdir/${plugin}/src/index.ts`)).not.toThrow()
      done()
    })
  })

  describe('--tags', () => {
    it('should add tags to nx.json', async (done) => {
      const plugin = uniq('nest')
      ensureNxProject('@nxpm/nest', 'dist/libs/nest')
      await runNxCommandAsync(`generate @nxpm/nest:nest ${plugin} --tags e2etag,e2ePackage`)
      const nxJson = readJson('nx.json')
      expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage'])
      done()
    })
  })
})
