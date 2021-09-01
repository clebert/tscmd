#!/usr/bin/env node

import compose from 'compose-function';
import yargs from 'yargs';
import {compile} from './command/compile.js';
import {fmt} from './command/fmt.js';
import {lint} from './command/lint.js';
import {setup} from './command/setup.js';
import {test} from './command/test.js';

const args = compose(
  test.describe,
  lint.describe,
  fmt.describe,
  compile.describe,
  setup.describe
)(
  yargs
    .usage('Usage: tscmd <command> [options]')
    .help('h')
    .alias('h', 'help')
    .detectLocale(false)
    .demandCommand(1, 1)
    .epilogue('The TypeScript command.')
    .strict()
).argv as {readonly _: unknown[]};

setup(args);
compile(args);
fmt(args);
lint(args);
test(args);
