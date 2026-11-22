# snpm (Simple Node Package Manager)

<img src="assets/snpmLogo.svg" alt="snpm" width="300">

A minimal package manager, written in JavaScript.

## Features

- Installs packages and their dependencies from the npm registry
- Resolves dependency version ranges using semver
- Records directly installed packages in `package.json`
- Creates a starter `package.json` with `snpm init`
- Uses a small runtime dependency set

## Install

```bash
npm install -g github:Polymer-505/snpm
```

Requires Node.js 18 or newer.

## Commands

```bash
snpm install <package>
snpm remove <package>
snpm init
snpm help
```

`install` selects the registry's `latest` version for the requested package, installs its dependencies recursively, and records the requested package in `package.json` using a caret range. If the project does not have a `package.json`, `install` creates one automatically. Scoped package names are supported.

`remove` deletes the package directory from `node_modules`. It doesn't remove that package's dependencies.

`init` creates a starter `package.json` using the current directory name. It exits with a message if `package.json` already exists.

## Examples

```bash
snpm install lodash
snpm install @polymer505/mss
snpm remove lodash
snpm init
```

## Building from Source

To compile `snpm` into a standalone executable, use `@yao-pkg/pkg`:

> For now, only for linux x64 and arm64

1. Clone the repository and install dependencies:

```bash
   git clone https://github.com/Polymer-505/snpm.git
   cd snpm
   npm install
```

2. Build the executable:

- For linux x64:

```bash
   npm run build
```

- For linux arm64:

```bash
   npm run build-arm64
```

## License

This project is licensed under the [MIT License](LICENSE).
