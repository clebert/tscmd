import {FileManager} from '../file-manager';

export function setupNpm(fileManager: FileManager): void {
  fileManager.registerPath('node_modules');
  fileManager.registerPath('package-lock.json', {versioned: true});
  fileManager.registerPath('package.json', {versioned: true});
}
