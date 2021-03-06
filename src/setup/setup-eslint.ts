import {FileManager} from '../file-manager';

export function setupEslint(fileManager: FileManager): void {
  fileManager.registerJsonFile('.eslintrc.json', () => ({
    extends: ['prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {project: 'tsconfig.json'},
    plugins: ['@typescript-eslint', 'eslint-plugin-import'],
    rules: {
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-shadow': ['error', {hoist: 'all'}],
      '@typescript-eslint/promise-function-async': 'error',
      '@typescript-eslint/require-await': 'error',
      'import/no-extraneous-dependencies': 'error',
      'import/order': [
        'error',
        {
          'alphabetize': {order: 'asc'},
          'newlines-between': 'never',
          'warnOnUnassignedImports': true,
        },
      ],
      'no-shadow': 'error',
    },
  }));
}
