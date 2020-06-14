import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing'
describe('react-native e2e', () => {
  it('should create react-native', async (done) => {
    const plugin = uniq('react-native')
    ensureNxProject('@nxpm/react-native', 'dist/libs/react-native')
    await runNxCommandAsync(`generate @nxpm/react-native:reactNative ${plugin}`)

    const result = await runNxCommandAsync(`build ${plugin}`)
    expect(result.stdout).toContain('Builder ran')

    done()
  })

  describe('--directory', () => {
    it('should create src in the specified directory', async (done) => {
      const plugin = uniq('react-native')
      ensureNxProject('@nxpm/react-native', 'dist/libs/react-native')
      await runNxCommandAsync(
        `generate @nxpm/react-native:reactNative ${plugin} --directory subdir`,
      )
      expect(() => checkFilesExist(`libs/subdir/${plugin}/src/index.ts`)).not.toThrow()
      done()
    })
  })

  describe('--tags', () => {
    it('should add tags to nx.json', async (done) => {
      const plugin = uniq('react-native')
      ensureNxProject('@nxpm/react-native', 'dist/libs/react-native')
      await runNxCommandAsync(
        `generate @nxpm/react-native:reactNative ${plugin} --tags e2etag,e2ePackage`,
      )
      const nxJson = readJson('nx.json')
      expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage'])
      done()
    })
  })
})
