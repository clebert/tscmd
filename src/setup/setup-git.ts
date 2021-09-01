import {FileManager} from '../file-manager';

export function setupGit(fileManager: FileManager): void {
  fileManager.registerTextFile(
    '.gitignore',
    ({nonVersionedPaths}) => nonVersionedPaths,
    {versioned: true}
  );
}
