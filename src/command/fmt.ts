import {spawnSync} from 'child_process';
import {existsSync} from 'fs';
import {dirname, resolve} from 'path';
import type {Argv} from 'yargs';

interface FmtArgs {
  readonly _: ['fmt'];
  readonly check: boolean;
}

function isFmtArgs(args: {readonly _: unknown[]}): args is FmtArgs {
  return args._[0] === 'fmt';
}

export function fmt(args: {readonly _: unknown[]}): void {
  if (!isFmtArgs(args)) {
    return;
  }

  const {check} = args;

  if (!existsSync('.prettierrc.json')) {
    console.error('Please set up the project first.');
    process.exit(1);
  }

  const result = spawnSync(
    resolve(dirname(require.resolve('prettier')), 'bin-prettier.js'),
    [
      ...(check ? ['--list-different'] : ['--write']),
      '**/*.{html,js,json,md,ts,tsx,yml}',
    ],
    {stdio: ['ignore', 1, 2]}
  );

  process.exit(result.status ?? 1);
}

fmt.describe = (argv: Argv) =>
  argv.command('fmt [options]', 'Format with Prettier', (command) =>
    command
      .describe('check', '')
      .boolean('check')
      .default('check', false)

      .example('tscmd fmt', '')
      .example('tscmd fmt --check', '')
  );
