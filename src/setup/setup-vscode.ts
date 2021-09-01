import {FileManager} from '../file-manager';

export function setupVscode(fileManager: FileManager): void {
  fileManager.registerTextFile('.editorconfig', () => [
    'root = true',
    '',
    '[*]',
    'charset = utf-8',
    'end_of_line = lf',
    'indent_size = 2',
    'indent_style = space',
    'insert_final_newline = true',
    'trim_trailing_whitespace = true',
    '',
    '[*.{html,js,json,md,ts,tsx,yml}]',
    'insert_final_newline = false',
    'trim_trailing_whitespace = false',
  ]);

  fileManager.registerJsonFile('.vscode/extensions.json', () => ({
    recommendations: [
      'dbaeumer.vscode-eslint',
      'editorconfig.editorconfig',
      'esbenp.prettier-vscode',
    ],
  }));

  fileManager.registerJsonFile(
    '.vscode/settings.json',
    ({nonVersionedPaths}) => ({
      'editor.formatOnSave': true,
      'eslint.options': {ignorePattern: 'lib'},
      'files.exclude': {
        ...nonVersionedPaths.reduce((exclude, path) => {
          exclude[path] = true;

          return exclude;
        }, {} as Record<string, boolean>),

        '.vscode': true,
        '**/.DS_Store': true,
        '**/.git': true,
      },
      'typescript.tsdk': 'node_modules/typescript/lib',
    })
  );
}
