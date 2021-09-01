import type {Argv} from 'yargs';
import {FileManager} from '../file-manager';
import {setupEslint} from '../setup/setup-eslint';
import {setupGit} from '../setup/setup-git';
import {setupJest} from '../setup/setup-jest';
import {setupNpm} from '../setup/setup-npm';
import {setupPrettier} from '../setup/setup-prettier';
import {Arch, Dist, setupTypescript} from '../setup/setup-typescript';
import {setupVscode} from '../setup/setup-vscode';

interface SetupArgs {
  readonly _: ['setup'];
  readonly arch: Arch;
  readonly dist: Dist;
}

function isSetupArgs(args: {readonly _: unknown[]}): args is SetupArgs {
  return args._[0] === 'setup';
}

export function setup(args: {readonly _: unknown[]}): void {
  if (!isSetupArgs(args)) {
    return;
  }

  const fileManager = new FileManager();
  const {arch, dist} = args;

  setupEslint(fileManager);
  setupGit(fileManager);
  setupJest(fileManager);
  setupNpm(fileManager);
  setupPrettier(fileManager);
  setupTypescript(fileManager, arch, dist);
  setupVscode(fileManager);

  fileManager.generateFiles();
}

setup.describe = (argv: Argv) =>
  argv.command('setup [options]', 'Set up project', (command) =>
    command
      .describe('arch', '')
      .choices('arch', ['node', 'preact', 'react', 'web'])
      .demandOption('arch')

      .describe('dist', '')
      .choices('dist', ['bundle', 'package'])
      .demandOption('dist')

      .example('tscmd setup --arch node --dist package', '')
      .example('tscmd setup --arch preact --dist bundle', '')
  );
