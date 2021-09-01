import {FileManager} from '../file-manager';

export function setupPrettier(fileManager: FileManager): void {
  fileManager.registerTextFile('.prettierignore', ({nonFormatablePaths}) => [
    ...nonFormatablePaths,
  ]);

  fileManager.registerJsonFile('.prettierrc.json', () => ({
    bracketSpacing: false,
    printWidth: 80,
    proseWrap: 'always',
    quoteProps: 'consistent',
    singleQuote: true,
  }));
}
