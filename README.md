# WPRDC Apps

Monorepo of everything related to frontend app development at the WPRDC.

[ARCHITECTURE.md](/ARCHITECTURE.md) - gives a high-level overview of the codebase.

## What's inside?

This monorepo is maintained using [Turborepo](https://turbo.build/repo/docs) and includes the following packages/apps:

### Apps

All apps built using [Next](https://nextjs.org/docs) unless otherwise stated.

| App                                          | Description                              | Links                                      |
| -------------------------------------------- | ---------------------------------------- | ------------------------------------------ |
| [`@wprdc/parcels-n-at`](./apps/parcels-n-at) | Parcel data explorer and downloader app. | [📓 README](./apps/parcels-n-at/README.md) |
| [`@wprdc/geomancer`](./apps/geomancer)       | Data mapping tool.                       | [📓 README](./apps/geomancer/README.md)    |

### Packages

The packages directory contains common libraries used by apps and shared tool configurations used everywhere.

| Package                                                    | Description                                                                                                                                                                                                                                                                                                                       |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@wprdc/ui`](./packages/ui)                               | React component library shared by all WPRDC apps. <br/>This also includes some utilities (like formatters) and widgets: special composite components that use WPRDC APIs.                                                                                                                                                         |
| [`@wprdc/api`](./packages/api)                             | Typescript library that provides APIs to CKAN as well as domain-specific APIs that are designed around available data on the WPRDC.                                                                                                                                                                                               |
| [`@wprdc/types`](./packages/types)                         | Typescript type library that provides common types.                                                                                                                                                                                                                                                                               |
| [`@wprdc/typescript-config`](./packages/typescript-config) | Common [TypeScript](https://www.typescriptlang.org/) configurations. <br/>Except for the `package.json` each file here is a `tsconfig.json` file. <br/>Packages and apps will each have their own `tsconfig.json` file that will extend from one of the files here. <br/>[📓 Reference](https://www.typescriptlang.org/tsconfig/) |
| [`@wprdc/tailwind-config`](./packages/tailwind-config)     | Common [Tailwind CSS](https://tailwindcss.com/) configuration shared by UI library and applications.<br/>[📓 Reference](https://tailwindcss.com/docs/configuration)                                                                                                                                                               |
| [`@wprdc/eslint-config`](./packages/eslint-config)         | [ESLint](https://eslint.org/) configurations. Each package and app will have its own `.eslintrc.js` that will extend from one of the common configurations here.                                                                                                                                                                  |

## Developing

1. Install [pnpm](https://pnpm.io/installation)
2. Clone repo
3. Install dependencies - `pnpm install`
4. Run tasks...

## Monorepo Tasks

The following [tasks](https://turbo.build/repo/docs/reference/command-line-reference/run) are defined:

- build - run package-specific build command
- lint - run [ESLint](https://eslint.org/) per package
- type-check - check types across packages
- dev - run development mode for each package

_Use `--filter` to limit tasks to specific packages or
apps - [reference](https://turbo.build/repo/docs/reference/command-line-reference/run#--filter)_

## Tools Configuration

Several dev tools, frameworks and libraries have settings files scattered throughout the repo. Configuration files may
be found at the root dir of the project,in the shared configuration libraries, and/or at the root of each individual
application and project.

| Tool                                        | Description                                       | Configuration Files                                   |
| ------------------------------------------- | ------------------------------------------------- | ----------------------------------------------------- |
| [pnpm](https://pnpm.io/)                    | Package manager.                                  | `pnpm-workspace.yaml` `pnpm-lock.yaml` `package.json` |
| [Turborepo ](https://turbo.build/repo/docs) | Monorepo build system                             | `turbo.json` `package.json`                           |
| [Prettier](https://prettier.io/)            | Opinionated Code Formatter                        | `.prettierrc`                                         |
| [tsup](https://tsup.egoist.dev/)            | Bundler used by Turborepo                         | `tsup.config.ts`                                      |
| [PostCSS](https://postcss.org/)             | CSS Processor - used to bundle tailwind with code | `postcss.config.js`                                   |
| [Next](https://nextjs.org/docs)             | React framework                                   | `next.config.js` `next.config.*.js`                   |
| [PostCSS](https://postcss.org/)             | CSS Processor - used to bundle tailwind with code | `postcss.config.js`                                   |

## 3rd part Libraries

The following libraries are heavily relied upon by the components and apps.

| Library                                                               | Description                                                |
| --------------------------------------------------------------------- | ---------------------------------------------------------- |
| [React Aria](https://react-spectrum.adobe.com/react-aria/)            | Components/utils for building accessible React components. |
| [MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/)           | Map rendering engine.                                      |
| [react-map-gl](https://visgl.github.io/react-map-gl/docs/get-started) | React component wrapper for MapLibre GL JS maps.           |
| [React Icons](https://react-icons.github.io/react-icons/)             | Provides Icons from various icon libraries                 |
