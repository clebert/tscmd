import {spawnSync} from 'child_process';
import {existsSync} from 'fs';
import {dirname, resolve} from 'path';
import type {Argv} from 'yargs';

interface TestArgs {
  readonly _: ['test'];
  readonly coverage: boolean;
  readonly passWithNoTests: boolean;
  readonly watch: boolean;
}

function isTestArgs(args: {readonly _: unknown[]}): args is TestArgs {
  return args._[0] === 'test';
}

export function test(args: {readonly _: unknown[]}): void {
  if (!isTestArgs(args)) {
    return;
  }

  const {coverage, passWithNoTests, watch} = args;

  if (!existsSync('jest.config.json')) {
    console.error('Please set up the project first.');
    process.exit(1);
  }

  const result = spawnSync(
    resolve(dirname(require.resolve('jest')), '../bin/jest.js'),
    [
      '--silent',
      ...(coverage ? ['--coverage'] : []),
      ...(passWithNoTests ? ['--passWithNoTests'] : []),
      ...(watch ? ['--watch'] : []),
    ],
    {stdio: ['ignore', 1, 2]}
  );

  process.exit(result.status ?? 1);
}

test.describe = (argv: Argv) =>
  argv.command('test [options]', 'Test with Jest', (command) =>
    command
      .describe('coverage', '')
      .boolean('coverage')
      .default('coverage', false)

      .describe('passWithNoTests', '')
      .boolean('passWithNoTests')
      .default('passWithNoTests', false)

      .describe('watch', '')
      .boolean('watch')
      .default('watch', false)

      .example('tscmd test', '')
      .example('tscmd test --coverage', '')
      .example('tscmd test --passWithNoTests', '')
      .example('tscmd test --watch', '')
      .example('tscmd test --coverage --watch', '')
  );
