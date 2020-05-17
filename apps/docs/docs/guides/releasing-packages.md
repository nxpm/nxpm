---
id: releasing-packages
title: Releasing packages
sidebar_label: Releasing packages
---

In this guide we create a new workspace, add some packages and release them to npm.

The workspace name we use is `nxpm-playground`.

For this guide to work, the workspace name should be the name of the npm scope we use to publish the packages. If you don't have a npm org you can [create one](https://www.npmjs.com/org/create) for free.

## Creating a new workspace

Open a shell and navigate to the directory where you want to create the project.

Run the following command to start:

```shell script
yarn create nx-workspace nxpm-playground
```

When prompted, we select the `empty` preset:

```shell script
❯ empty             [an empty workspace]
  web components    [a workspace with a single app built using web components]
  angular           [a workspace with a single Angular application]
  angular-nest      [a workspace with a full stack application (Angular + Nest)]
  react             [a workspace with a single React application]
  react-express     [a workspace with a full stack application (React + Express)]
  next.js           [a workspace with a single Next.js application]
```

After that, we select the `Nx` CLI:

```shell script
? CLI to power the Nx workspace
❯ Nx           [Extensible CLI for JavaScript and TypeScript applications]
  Angular CLI  [Extensible CLI for Angular applications. Recommended for Angular projects.]
```

The installation will start and create our project in `nxpm-playground`

## Adding a GitHub repository

Once this is done we [create a new repository](https://github.com/new) and add it to the project. This is needed in order to publish the release to GitHub, including the changelog.

```shell script
cd nxpm-playground
git remote add origin git@github.com:beeman/nxpm-playground.git
```

## Getting a GitHub token

[Create a personal access token](https://github.com/settings/tokens/new) with the `repo` scope selected.

We export this token as the `GITHUB_TOKEN` environment variable. This gives the `release` command access to publish the release.

```shell script
export GITHUB_TOKEN=<your-token>
```

## Adding Nx apps and libraries

Next up we're going to add some Nrwl libraries which we'll use to create some apps and libs:

```shell script
yarn add -D @nrwl/angular @nrwl/node
```

Once this is done we create our `web` and `api` apps:

```shell script
nx g @nrwl/node:app api
nx g @nrwl/angular:app web --style scss --routing
```

Finally, we will create a library for both of our apps:

```shell script
nx g @nrwl/node:lib api-core --publishable
nx g @nrwl/angular:lib web-core --style scss --publishable
```

:::important
Make sure create your libraries with the `--publishable` flag, otherwise the `release` command will not recognize them!
:::

## Building our projects

At this point we're ready to build our project and release the packages.

```shell script
yarn nx run-many --target build --all
```

This will build all the 4 projects in our workspace.

```shell script
>  NX  Running target build for projects:

  - api-core
  - web-core
  - api
  - web

.......
>  NX   SUCCESS  Running target "build" succeeded
```

## Commit and push to GitHub

Currently, the `release` command expects a remove branch to exist. If this is not the case, it will fail.

Let's commit all changes and push them to github:

```shell script
git add .
git commit -m "feat: initial commit"
git push origin master
```

## Releasing our libraries

Once this is all in place, we are ready to publish the libraries `api-core` and `web-core` to npm.

First we need to install `nxpm` as a dev dependency:

```shell script
yarn add -D nxpm
```

Once that is in place, we will run the `release` command in `dry-run` mode:

```shell script
yarn nxpm release 1.0.0 --dry-run
```

Initially, the command will fail with some errors:

```shell script
 NXPM  VALIDATE Using nx workspace: workspace.json
 NXPM  VALIDATE Found 2 libraries:
 NXPM  VALIDATE Found builder for api-core: @nrwl/node:package
 NXPM  VALIDATE Found builder for web-core: @nrwl/angular:package
 NXPM  ERROR Version "0.0.1" should be "0.0.0-development" in libs/api-core/package.json
 NXPM  ERROR License not defined in in libs/api-core/package.json
 NXPM  ERROR Version "0.0.1" should be "0.0.0-development" in libs/web-core/package.json
 NXPM  ERROR License not defined in in libs/web-core/package.json
 NXPM  Could not continue because of errors in the following packages:
[ 'api-core', 'web-core' ]
 NXPM  Try running this command with the --fix flag to fix some common problems
 NXPM   ERROR  Error validating packages
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

Let's use the `--fix` flag to have nxpm fix the issues:

```shell script
yarn nxpm release 1.0.0 --dry-run --fix
 NXPM  VALIDATE Using nx workspace: workspace.json
 NXPM  VALIDATE Found 2 libraries:
 NXPM  VALIDATE Found builder for api-core: @nrwl/node:package
 NXPM  VALIDATE Found builder for web-core: @nrwl/angular:package
 NXPM  ERROR Version "0.0.1" should be "0.0.0-development" in libs/api-core/package.json
 NXPM  FIXED Version set to "0.0.0-development" in libs/api-core/package.json
 NXPM  ERROR License not defined in in libs/api-core/package.json
 NXPM  FIXED License set to MIT in libs/api-core/package.json
 NXPM  VALIDATE Package @nxpm-playground/api-core is valid.
 NXPM  ERROR Version "0.0.1" should be "0.0.0-development" in libs/web-core/package.json
 NXPM  FIXED Version set to "0.0.0-development" in libs/web-core/package.json
 NXPM  ERROR License not defined in in libs/web-core/package.json
 NXPM  FIXED License set to MIT in libs/web-core/package.json
 NXPM  VALIDATE Package @nxpm-playground/web-core is valid.
 NXPM  VALIDATE Found 2 packages to release
```

After the packages are valid it's time to actually release them.

```shell script
yarn nxpm release 1.0.0
```

You will be asked several questions, answer all of them with `Yes` (or just hit `enter`)

```shell script
? Commit (Release 1.0.0)? Yes
? Tag (1.0.0)? Yes
? Push? Yes
? Create a release on GitHub (Release 1.0.0)? Yes
```

Once the release is published to github, `npm publish` will be executed:

```shell script
🔗 https://github.com/beeman/nxpm-playground/releases/tag/1.0.0
🏁 Done (in 89s.)
npm notice
npm notice 📦  @nxpm-playground/api-core@1.0.0
npm notice === Tarball Contents ===
npm notice ...
npm notice === Tarball Details ===
npm notice name:          @nxpm-playground/api-core
npm notice version:       1.0.0
npm notice package size:  815 B
npm notice unpacked size: 1.1 kB
npm notice shasum:        ccd92142c8ca2afcf87af51cc49d8a5ed864d6e4
npm notice integrity:     sha512-MNBRRnyrYCNO3[...]hmBRJWKYoEaCQ==
npm notice total files:   8
npm notice
+ @nxpm-playground/api-core@1.0.0
npm WARN lifecycle The node binary used for scripts is /var/folders/rr/n45jfj7130x1vdvcv4dywpvc0000gn/T/yarn--1589448482284-0.49769534594014986/node but npm is using /usr/local/Cellar/node@12/12.16.2_1/bin/node itself. Use the `--scripts-prepend-node-path` option to include the path for the node binary npm was executed with.

> @nxpm-playground/web-core@1.0.0 prepublishOnly .
> true

npm notice
npm notice 📦  @nxpm-playground/web-core@1.0.0
npm notice === Tarball Contents ===
npm notice ...
npm notice === Tarball Details ===
npm notice name:          @nxpm-playground/web-core
npm notice version:       1.0.0
npm notice package size:  2.9 kB
npm notice unpacked size: 11.9 kB
npm notice shasum:        32f6bb1ed1cd30105f22a329a4352bb2f0d3b625
npm notice integrity:     sha512-p7tF1BecQJXQ1[...]e7szdOYGqZSqQ==
npm notice total files:   25
npm notice
+ @nxpm-playground/web-core@1.0.0
 NXPM  SUCCESS It looks like we're all done here! :)
```

Aaaand we're done! You can check the resulting packages
[api-core](https://www.npmjs.com/package/@nxpm-playground/api-core) and
[api-web](https://www.npmjs.com/package/@nxpm-playground/api-web).

If you get stuck, feel free to ping me on [discord](https://discord.gg/RTgCpDd) or the [Nrwl Community Slack](https://join.slack.com/t/nrwlcommunity/shared_invite/zt-9oqftflu-gcpO8xpMCdBhxUWmtuwr~g).
