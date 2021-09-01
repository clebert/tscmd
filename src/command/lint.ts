import {spawnSync} from 'child_process';
import {existsSync} from 'fs';
import {dirname, resolve} from 'path';
import type {Argv} from 'yargs';

interface LintArgs {
  readonly _: ['lint'];
}

function isLintArgs(args: {readonly _: unknown[]}): args is LintArgs {
  return args._[0] === 'lint';
}

export function lint(args: {readonly _: unknown[]}): void {
  if (!isLintArgs(args)) {
    return;
  }

  if (!existsSync('.eslintrc.json')) {
    console.error('Please set up the project first.');
    process.exit(1);
  }

  const result = spawnSync(
    resolve(dirname(require.resolve('eslint')), '../bin/eslint.js'),
    ['src/**/*.ts'],
    {stdio: ['ignore', 1, 2]}
  );

  process.exit(result.status ?? 1);
}

lint.describe = (argv: Argv) =>
  argv.command('lint [options]', 'Lint with ESLint', (command) =>
    command.example('tscmd lint', '')
  );
