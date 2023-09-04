import { constants, promises as fs } from 'node:fs';
import logSymbols from 'log-symbols';
import { dirname } from 'node:path';

export async function copyFile(wordpressSourcePath: string, targetPath: string, forceOverwrite = false) {
  if (!forceOverwrite && await fileExists(targetPath)) {
    console.error(`${logSymbols.error} File exists at target. Use --force to overwrite.`);
    process.exit(1);
  }

  const parentDir = dirname(targetPath);

  if (!await fileExists(parentDir)) {
    await fs.mkdir(parentDir, {
      recursive: true
    });
  }

  try {
    await fs.copyFile(wordpressSourcePath, targetPath);
  } catch (error) {
    console.error(`${logSymbols.error} Failed to copy ${wordpressSourcePath}. Aborting.`);
  }
}

export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath, constants.W_OK);
  } catch (error) {
    return false;
  }

  return true;
}
