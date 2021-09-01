import {FileManager} from '../file-manager';

export function setupJest(fileManager: FileManager): void {
  fileManager.registerJsonFile('.babelrc.json', () => ({
    presets: [
      ['@babel/env', {targets: {node: 'current'}}],
      '@babel/typescript',
    ],
  }));

  fileManager.registerPath('coverage');

  fileManager.registerJsonFile('jest.config.json', () => ({
    coverageThreshold: {
      global: {branches: 100, functions: 100, lines: 100, statements: 100},
    },
    testMatch: ['**/src/**/*.test.ts'],
  }));
}
