import {existsSync, unlinkSync, writeFileSync} from 'fs';
import {dirname} from 'path';
import mkdir from 'mkdirp';

export interface FileOptions {
  readonly versioned?: boolean;
}

export interface PathOptions extends FileOptions {
  readonly writer?: () => void;
}

export interface FileGeneratorArgs {
  readonly nonFormatablePaths: readonly string[];
  readonly nonVersionedPaths: readonly string[];
}

export class FileManager {
  readonly #nonVersionedPaths = new Set<string>();
  readonly #writers = new Map<string, (() => void) | undefined>();

  generateFiles(): void {
    for (const writer of this.#writers.values()) {
      writer?.();
    }
  }

  deleteFile(filename: string): void {
    if (existsSync(filename)) {
      unlinkSync(filename);
    }
  }

  registerPath(path: string, {writer, versioned}: PathOptions = {}): void {
    if (this.#writers.has(path)) {
      throw new Error(`The path is already registered: ${path}`);
    }

    this.#writers.set(path, writer);

    if (!versioned) {
      this.#nonVersionedPaths.add(path);
    }
  }

  registerJsonFile(
    filename: string,
    generator: (args: FileGeneratorArgs) => object,
    options?: FileOptions
  ): void {
    this.registerPath(filename, {
      ...options,
      writer: () => {
        mkdir.sync(dirname(filename));

        writeFileSync(
          filename,
          JSON.stringify(
            generator({
              nonFormatablePaths: Array.from(this.#writers.keys()),
              nonVersionedPaths: Array.from(this.#nonVersionedPaths),
            }),
            undefined,
            2
          ) + '\n'
        );
      },
    });
  }

  registerTextFile(
    filename: string,
    generator: (args: FileGeneratorArgs) => readonly string[],
    options?: FileOptions
  ): void {
    this.registerPath(filename, {
      ...options,
      writer: () => {
        mkdir.sync(dirname(filename));

        writeFileSync(
          filename,
          [
            ...generator({
              nonFormatablePaths: Array.from(this.#writers.keys()),
              nonVersionedPaths: Array.from(this.#nonVersionedPaths),
            }),
            '',
          ].join('\n')
        );
      },
    });
  }
}
