# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a monorepo maintained using [Turborepo](https://turbo.build/repo/docs) for the WPRDC. It includes frontend applications and shared libraries.

## Architecture

The codebase is structured as follows:

- **`/apps`**: Contains applications that utilize packages from `/packages`.
- **`/packages`**:  Contains shared libraries and configurations, including:
    - `@wprdc/ui`: React component library.
    - `@wprdc/api`: Typescript library providing APIs to CKAN and domain-specific APIs.
    - `@wprdc/types`: Typescript type library.
    - `@wprdc/typescript-config`: Common TypeScript configurations.
    - `@wprdc/tailwind-config`: Common Tailwind CSS configuration.
    - `@wprdc/eslint-config`: Common ESLint configurations.

The dependency graph is roughly as follows:

```
------------------
|      Apps      |
------------------       ^   apps/   ^
   ↑     ↑     ↑         -------------
------      -------      ˅ packages/ ˅
| UI | <-↑<- | API |
------       ------- 
   ↑     ↑      ↑
------------------
|      Types     |
------------------
```

## Development Workflow

1. **Install Dependencies:** `pnpm install`
2. **Build:**  Use `turbo build` to build all packages or `turbo build --filter <package-name>` for a specific package.
3. **Lint:** Use `turbo lint` to run ESLint across all packages or `turbo lint --filter <package-name>` for a specific package.
4. **Type Check:** Use `turbo type-check` to check types across all packages or `turbo type-check --filter <package-name>` for a specific package.
5. **Development Mode:** Use `turbo dev` to start development mode for all packages or `turbo dev --filter <package-name>` for a specific package.

## Important Considerations

*   **Cursor/Copilot Rules:**  Refer to `.cursor/rules` and `.github/copilot-instructions.md` for specific coding guidelines and best practices within this repository.
*   **Configuration Files:** Key configuration files include: `pnpm-lock.yaml`, `turbo.json`, `.npmrc`, `tailwind.config.js`, and package-specific `tsconfig.json` files (extending from configurations in `/packages/typescript-config`).