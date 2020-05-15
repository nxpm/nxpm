# nxpm

<p align="center"><img src="https://avatars0.githubusercontent.com/u/65322676?s=400&u=4a36f7a4110a16d674cba9610dae5d5e2966ab3a&v=4"></p>

<p align="center">CLI to make the world-class [nx workspace](https://github.com/nrwl/nx) even more amazing!</p>

<p align="center"><a href="https://nxpm.github.io/">nxpm.github.io</a></p>

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/nxpm.svg)](https://npmjs.org/package/nxpm)
[![CircleCI](https://circleci.com/gh/nxpm/nxpm/tree/master.svg?style=shield)](https://circleci.com/gh/nxpm/nxpm/tree/master)
[![Downloads/week](https://img.shields.io/npm/dw/nxpm.svg)](https://npmjs.org/package/nxpm)
[![License](https://img.shields.io/npm/l/nxpm.svg)](https://github.com/nxpm/nxpm/blob/master/package.json)

<!-- toc -->
* [nxpm](#nxpm)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g nxpm
$ nxpm COMMAND
running command...
$ nxpm (-v|--version|version)
nxpm/1.1.0 darwin-x64 node-v12.16.2
$ nxpm --help [COMMAND]
USAGE
  $ nxpm COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`nxpm help [COMMAND]`](#nxpm-help-command)
* [`nxpm registry:disable`](#nxpm-registrydisable)
* [`nxpm registry:enable`](#nxpm-registryenable)
* [`nxpm registry:start`](#nxpm-registrystart)
* [`nxpm registry:status`](#nxpm-registrystatus)
* [`nxpm release [VERSION]`](#nxpm-release-version)

## `nxpm help [COMMAND]`

display help for nxpm

```
USAGE
  $ nxpm help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `nxpm registry:disable`

Disable yarn and npm from using local npm registry

```
USAGE
  $ nxpm registry:disable
```

_See code: [src/commands/registry/disable.ts](https://github.com/nxpm/nxpm-cli/blob/v1.1.0/src/commands/registry/disable.ts)_

## `nxpm registry:enable`

Configure yarn and npm to use the local registry

```
USAGE
  $ nxpm registry:enable
```

_See code: [src/commands/registry/enable.ts](https://github.com/nxpm/nxpm-cli/blob/v1.1.0/src/commands/registry/enable.ts)_

## `nxpm registry:start`

Start local npm registry

```
USAGE
  $ nxpm registry:start
```

_See code: [src/commands/registry/start.ts](https://github.com/nxpm/nxpm-cli/blob/v1.1.0/src/commands/registry/start.ts)_

## `nxpm registry:status`

Show yarn and npm registry configuration

```
USAGE
  $ nxpm registry:status
```

_See code: [src/commands/registry/status.ts](https://github.com/nxpm/nxpm-cli/blob/v1.1.0/src/commands/registry/status.ts)_

## `nxpm release [VERSION]`

Release publishable packages in an Nx Workspace

```
USAGE
  $ nxpm release [VERSION]

ARGUMENTS
  VERSION  The version you want to release in semver format (eg: 1.2.3-beta.4)

OPTIONS
  -c, --cwd=cwd    [default: /Users/beeman/nxpm] Current working directory
  -d, --dry-run    Dry run, don't make permanent changes
  -f, --fix        Automatically fix known issues
  -h, --help       show CLI help
  -i, --allow-ivy  Allow publishing Angular packages built for Ivy
```

_See code: [src/commands/release.ts](https://github.com/nxpm/nxpm-cli/blob/v1.1.0/src/commands/release.ts)_
<!-- commandsstop -->
