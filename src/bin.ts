#!/usr/bin/env node

import compose from 'compose-function';
import yargs from 'yargs';
import {compile} from './command/compile';
import {fmt} from './command/fmt';
import {lint} from './command/lint';
import {setup} from './command/setup';
import {test} from './command/test';

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
