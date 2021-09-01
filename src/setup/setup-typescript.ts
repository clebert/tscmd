import {FileManager} from '../file-manager';

export type Arch = 'node' | 'preact' | 'react' | 'web';
export type Dist = 'bundle' | 'package';

export function setupTypescript(
  fileManager: FileManager,
  arch: Arch,
  dist: Dist
): void {
  fileManager.registerPath('lib');

  fileManager.registerJsonFile('tsconfig.json', () => ({
    compilerOptions: {
      // Type Checking
      allowUnreachableCode: false,
      allowUnusedLabels: false,
      // exactOptionalPropertyTypes: true,
      noFallthroughCasesInSwitch: true,
      noImplicitOverride: true,
      noImplicitReturns: true,
      // noPropertyAccessFromIndexSignature: true,
      noUncheckedIndexedAccess: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      strict: true,

      // Modules
      module: 'ESNext',
      moduleResolution: 'Node',
      rootDir: 'src',

      // Emit
      declaration: dist === 'package',
      sourceMap: dist === 'bundle',

      // Interop Constraints
      esModuleInterop: true,
      forceConsistentCasingInFileNames: true,
      isolatedModules: true,

      // Language and Environment
      jsx:
        arch === 'preact' ? 'react-jsx' : arch === 'react' ? arch : undefined,
      jsxImportSource: arch === 'preact' ? arch : undefined,
      lib: arch === 'node' ? ['ES2017'] : ['DOM', 'ES2017'],
      target: 'ES2017',
    },
    include: ['src/**/*.ts', 'src/**/*.tsx', '*.js'],
  }));

  if (dist === 'bundle') {
    fileManager.deleteFile('tsconfig.cjs.json');
    fileManager.deleteFile('tsconfig.esm.json');
  } else {
    fileManager.registerJsonFile('tsconfig.cjs.json', () => ({
      compilerOptions: {module: 'CommonJS', outDir: 'lib/cjs'},
      extends: './tsconfig.json',
    }));

    fileManager.registerJsonFile('tsconfig.esm.json', () => ({
      compilerOptions: {outDir: 'lib/esm'},
      extends: './tsconfig.json',
    }));
  }
}
