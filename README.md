# tscmd

[![][ci-badge]][ci-link] [![][version-badge]][version-link]
[![][license-badge]][license-link] [![][types-badge]][types-link]

[ci-badge]: https://github.com/clebert/tscmd/workflows/CI/badge.svg
[ci-link]: https://github.com/clebert/tscmd
[version-badge]: https://badgen.net/npm/v/@clebert/tscmd
[version-link]: https://www.npmjs.com/package/@clebert/tscmd
[license-badge]: https://badgen.net/npm/license/@clebert/tscmd
[license-link]: https://github.com/clebert/tscmd/blob/master/LICENSE.md
[types-badge]: https://badgen.net/npm/types/@clebert/tscmd
[types-link]: https://github.com/clebert/tscmd

The TypeScript command.

## Installation

```
npm install @clebert/tscmd --save-dev
```

## Usage

```
Usage: tscmd <command> [options]

Commands:
  tscmd setup [options]    Set up project
  tscmd compile [options]  Compile with TypeScript
  tscmd fmt [options]      Format with Prettier
  tscmd lint [options]     Lint with ESLint
  tscmd test [options]     Test with Jest

Options:
      --version  Show version number                                   [boolean]
  -h, --help     Show help                                             [boolean]
```

---

Copyright 2021 Clemens Akens. All rights reserved.
[MIT license](https://github.com/clebert/tscmd/blob/master/LICENSE.md).
