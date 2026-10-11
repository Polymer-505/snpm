# snpm (Simple Node Package Manager)

A simple node package manager written in JavaScript

## Features

- Installs packages from npmjs.com
- Has no dependencies

## Install

```bash
npm install -g github:Polymer-505/snpm
```

## Usage

```bash
snpm <command>
```

## Examples

```bash
snpm install lodash
snpm install @polymer505/mss
```

## Status

Early version (0.3.0). Only `install`, `remove` and `init` are implemented. `update` is planned.

> Note: `install` and `remove` don't update `package.json` yet. `remove` deletes only the package itself, its dependencies are left in place for now.

## Building from Source

If you want to compile `snpm` into a standalone executable file, use `@yao-pkg/pkg`:

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
