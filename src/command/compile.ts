import {spawnSync} from 'child_process';
import {existsSync} from 'fs';
import {dirname, resolve} from 'path';
import type {Argv} from 'yargs';

interface CompileArgs {
  readonly _: ['compile'];
  readonly output: 'cjs' | 'esm';
  readonly watch: boolean;
}

function isCompileArgs(args: {readonly _: unknown[]}): args is CompileArgs {
  return args._[0] === 'compile';
}

export function compile(args: {readonly _: unknown[]}): void {
  if (!isCompileArgs(args)) {
    return;
  }

  const {output, watch} = args;
  const tsconfigFilename = `tsconfig.${output}.json`;

  if (!existsSync(tsconfigFilename)) {
    console.error('Please set up the project as a package first.');
    process.exit(1);
  }

  const result = spawnSync(
    resolve(dirname(require.resolve('typescript')), '../bin/tsc'),
    [
      '--project',
      tsconfigFilename,
      '--incremental',
      '--pretty',
      ...(watch ? ['--watch'] : []),
    ],
    {stdio: ['ignore', 1, 2]}
  );

  process.exit(result.status ?? 1);
}

compile.describe = (argv: Argv) =>
  argv.command('compile [options]', 'Compile with TypeScript', (command) =>
    command
      .describe('output', '')
      .choices('output', ['cjs', 'esm'])
      .demandOption('output')

      .describe('watch', '')
      .boolean('watch')
      .default('watch', false)

      .example('tscmd compile --output cjs', '')
      .example('tscmd compile --output esm --watch', '')
  );
