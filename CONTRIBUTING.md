# Contributing

Thanks for your interest in contributing to UI Registries. We're happy to have you here.

Please take a moment to review this document before submitting your first pull request. We also strongly recommend that you check for open issues and pull requests to see if someone else is working on something similar.

## About this repository

This repository is a monorepo.

- We use [pnpm](https://pnpm.io) and [`workspaces`](https://pnpm.io/workspaces) for development.
- We use [Turborepo](https://turbo.build/repo) as our build system.
- We use [changesets](https://github.com/changesets/changesets) for managing releases.

## Structure

This repository is structured as follows:

```
apps
├── web
│   ├── app
│   ├── components
│   └── public
└── www
    ├── app
    ├── components
    ├── content
    └── registry
        ├── default
        └── new-york
packages
├── ui-registries
│   └── src
└── tests
```

| Path                     | Description                                      |
| ------------------------ | ------------------------------------------------ |
| `apps/web`               | The main UI Registries application.              |
| `apps/web/app`           | The Next.js application for the registry viewer. |
| `apps/web/components`    | The React components for the main app.           |
| `apps/www`               | The shadcn/ui documentation site.                |
| `apps/www/app`           | The Next.js application for the website.         |
| `apps/www/components`    | The React components for the website.            |
| `apps/www/content`       | The documentation content.                       |
| `apps/www/registry`      | The component registry.                          |
| `packages/ui-registries` | The UI Registries CLI package.                   |
| `packages/tests`         | Test suite for the CLI.                          |

## Development

### Fork this repo

You can fork this repo by clicking the fork button in the top right corner of this page.

### Clone on your local machine

```bash
git clone https://github.com/your-username/ui-registries.git
```

### Navigate to project directory

```bash
cd ui-registries
```

### Create a new Branch

```bash
git checkout -b my-new-branch
```

### Install dependencies

```bash
pnpm install
```

### Run a workspace

You can use the `pnpm --filter=[WORKSPACE]` command to start the development process for a workspace.

#### Examples

1. To run the main UI Registries web application:

```bash
pnpm web:dev
```

or

```bash
pnpm --filter=@apps/web dev
```

2. To run the shadcn/ui documentation site:

```bash
pnpm www:dev
```

or

```bash
pnpm --filter=www dev
```

3. To work on the UI Registries CLI:

```bash
pnpm shadcn:dev
```

or

```bash
pnpm --filter=ui-registries dev
```

## Running the CLI Locally

To run the UI Registries CLI locally, you can follow the workflow:

1. Run the development script for the CLI:

   ```bash
   pnpm shadcn:dev
   ```

2. In another terminal tab, test the CLI by running:

   ```bash
   pnpm shadcn
   ```

   To test the CLI in a specific app, use a command like:

   ```bash
   pnpm shadcn <init | add | ...> -c ~/Desktop/my-app
   ```

3. To run the tests for the CLI:

   ```bash
   pnpm shadcn:test
   ```

   or

   ```bash
   pnpm --filter=ui-registries test
   ```

This workflow ensures that you are testing the CLI properly in your local environment.

## Documentation

The documentation for this project is located in the `www` workspace. You can run the documentation locally by running the following command:

```bash
pnpm www:dev
```

Documentation is written using [MDX](https://mdxjs.com). You can find the documentation files in the `apps/www/content/docs` directory.

## Main Application

The main UI Registries application is located in `apps/web`. This is the application that displays the registry viewer. You can run it locally by running:

```bash
pnpm web:dev
```

## Components

The `apps/www` workspace uses a registry system for developing components. You can find the source code for the components under `apps/www/registry`. The components are organized by styles.

```bash
apps
└── www
    └── registry
        ├── default
        │   ├── example
        │   └── ui
        └── new-york
            ├── example
            └── ui
```

When adding or modifying components in the `www` workspace, please ensure that:

1. You make the changes for every style.
2. You update the documentation.
3. You run `pnpm build:registry` to update the registry.

## Commit Convention

Before you create a Pull Request, please check whether your commits comply with
the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention
`category(scope or module): message` in your commit message while using one of
the following categories:

- `feat / feature`: all changes that introduce completely new code or new
  features
- `fix`: changes that fix a bug (ideally you will additionally reference an
  issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation (i.e. README, docs for
  usage of a lib or cli usage)
- `build`: all changes regarding the build of the software, changes to
  dependencies or the addition of new dependencies
- `test`: all changes regarding tests (adding new tests or changing existing
  ones)
- `ci`: all changes regarding the configuration of continuous integration (i.e.
  github actions, ci system)
- `chore`: all changes to the repository that do not fit into any of the above
  categories

  e.g. `feat(components): add new prop to the avatar component`

If you are interested in the detailed specification you can visit
https://www.conventionalcommits.org/ or check out the
[Angular Commit Message Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

## Requests for new components

If you have a request for a new component, please open a discussion on GitHub. We'll be happy to help you out.

## Registry Sync

The registries list is synced daily using GitHub API. If you need to manually trigger a sync or update the sync logic:

```bash
pnpm registry:sync
```

The sync script is located in `scripts/syncRegistry.ts`.

## CLI

The `ui-registries` package is a CLI for working with UI registries and adding components to your project.

Any changes to the CLI should be made in the `packages/ui-registries` directory. If you can, it would be great if you could add tests for your changes.

## Testing

Tests are written using [Vitest](https://vitest.dev). You can run all the tests from the root of the repository.

```bash
pnpm test
```

Please ensure that the tests are passing when submitting a pull request. If you're adding new features, please include tests.
