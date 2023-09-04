// @ts-ignore
import expandPath from '@antora/expand-path-helper';
import { fileExists } from './fs.js';

export async function handlePathValidation(value: string, forceMakedir = false): Promise<boolean | string> {

  const result = await fileExists(expandPath(value));

  if (result) {
    return result;
  }

  if (forceMakedir) {
    return true;
  }

  return 'Folder does not exist or is not writeable. . Use --force to create output folder.';
}
