# Project Architecture

This document will provide high-level design and code structure notes.

## Monorepo

The monorepo is maintained using Turborepo.
It's recommended to explore the [Turborepo docs](https://turbo.build/repo/docs) in addition to this file.


## Directory Structure

In general, each app and project will have a `src` directory for source code with configuration file at the project's
root.

### Apps

The [`/apps`](/apps) directory is where applications that use packages from `/packages` are kept.

### Packages

The [`/packages`](/packages) directory is where shared libraries are kept, including shared configurations for tooling.


### Dependency graph

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
