---
id: release
title: nxpm release
sidebar_label: release
---

The `release` command helps versioning, releasing packages to GitHub and publishing them to npm.

Before it does this, it will validate the workspace and can fix some inconsistencies that might exist in your packages.

:::important
The `release` command does **not** build your packages.

In order to build all your packages you can run:

```shell script
yarn nx run-many --target build --all
```

:::

## Validation

At this moment the `release` command is very opinionated about what and how it publishes.

- It publishes all the `publishable` packages defined in the workspace file.
- It requires all packages to have their `name` start with the `npmScope` defined in `nx.json`.
- It requires all packages to have a `license` field.
- It requires all packages to have their `version` set to `0.0.0-development`.

This is all subject to change, ideally this tool should be flexible enough to fit all common use cases for releasing to npm.

Feel free to share [thoughts](https://github.com/nxpm/nxpm-cli/issues) or [code](https://github.com/nxpm/nxpm-cli/pulls).

## Dry Run

Because you probably don't want to risk publishing broken packages to npm, it's smart to run the release command in dry-run mode:

```shell script
nxpm release 1.0.0 --dry-run
```

This will run the validations and tell you if it's able to release the package or if you need to fix things.

The cli has a `--fix` option that will fix the issues for you.

## Fix

The `--fix` flag will try to correct any validations errors it finds.

```shell script
nxpm release 1.0.0 --dry-run --fix
```

## Release

Once you are happy with the suggested release plan, you can run it:

```shell script
nxpm release 1.0.0
```

## Options

| Option      | Alias | Default       | Description                                                         |
| ----------- | ----- | ------------- | ------------------------------------------------------------------- |
| version     | n/a   | none          | The version you want to release in semver format (eg: 1.2.3-beta.4) |
| --cwd       | -c    | process.cwd() | The version you want to release in semver format (eg: 1.2.3-beta.4) |
| --dry-run   | -d    | false         | Dry run, don't make permanent changes                               |
| --fix       | -f    | false         | Automatically fix known issues                                      |
| --help      | -h    | false         | show CLI help                                                       |
| --allow-ivy | -i    | true          | Allow publishing Angular packages built for Ivy                     |
