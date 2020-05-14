---
id: registry
title: nxpm registry
sidebar_label: registry
---

The `registry` command helps you run a local npm registry and configure `npm` and `yarn` to use it.
This can be very useful if you are developing packages and don't want to pollute the official npm registry.

It works by executing the command `npx verdaccio`. If it's not installed globally, `npx` will handle that for you. If you want to speed up this process, make sure to install `verdaccio` globally.

## Start a local registry

```shell script
nxpm registry:start
```

```
NXPM  RUNNING npx verdaccio
warn --- config file  - ~/.config/verdaccio/config.yaml
warn --- Verdaccio started
warn --- Plugin successfully loaded: verdaccio-htpasswd
warn --- Plugin successfully loaded: verdaccio-audit
warn --- http address - http://localhost:4873/ - verdaccio/4.5.1
```

## Configure npm and yarn

Configure npm and yarn to use the local registry

```shell script
nxpm registry:enable
```

```
 NXPM  RUNNING npm config set registry http://localhost:4873/
 NXPM  RUNNING yarn config set registry http://localhost:4873/
yarn config v1.22.4
success Set "registry" to "http://localhost:4873/".
```

## Check npm and yarn status

```shell script
nxpm registry:status
```

```
 NXPM  RUNNING npm config get registry
http://localhost:4873/
 NXPM  RUNNING yarn config get registry
http://localhost:4873/
```

## Disable npm and yarn

Disable yarn and npm from using local npm registry

```shell script
nxpm registry:disable
```

```shell script
 NXPM  RUNNING npm config delete registry
 NXPM  RUNNING yarn config delete registry
yarn config v1.22.4
success Deleted "registry".
```

## Credits

This command is based on [this script](https://github.com/nrwl/nx/blob/master/scripts/local-registry.sh).
