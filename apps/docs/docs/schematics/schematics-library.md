---
id: schematics-library
title: schematics-library
sidebar_label: schematics-library
---

Use the `schematics-library` schematic to publish your own schematics!

# Creating the library

```shell script
yarn add -D @nxpm/schematics
nx g @nxpm/schematics:schematics-libary schematics
```

This will create a library based on `@nrwl/node:lib` with some extra configuration
to make it a valid schematic.

```
CREATE tslint.json (1671 bytes)
CREATE libs/schematics/tslint.json (97 bytes)
CREATE libs/schematics/README.md (174 bytes)
CREATE libs/schematics/tsconfig.json (123 bytes)
CREATE libs/schematics/tsconfig.lib.json (253 bytes)
CREATE libs/schematics/src/index.ts (0 bytes)
CREATE jest.config.js (250 bytes)
CREATE libs/schematics/jest.config.js (244 bytes)
CREATE libs/schematics/tsconfig.spec.json (273 bytes)
CREATE libs/schematics/package.json (294 bytes)
CREATE libs/schematics/src/lib/collection.json (242 bytes)
CREATE libs/schematics/src/lib/hello-world/hello-world.spec.ts (478 bytes)
CREATE libs/schematics/src/lib/hello-world/hello-world.ts (307 bytes)
UPDATE tsconfig.json (573 bytes)
UPDATE angular.json (3512 bytes)
UPDATE nx.json (541 bytes)
UPDATE package.json (1528 bytes)
✔ Packages installed successfully.
```

# Building the library

```shell script
yarn build schematics
```

# Publishing to npm

```shell script
cd dist/libs/schematics
npm publish
```
