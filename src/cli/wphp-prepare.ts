#!/usr/bin/env node

import { Command } from 'commander';
import { copyFile } from './fs.js';
import { destinationPath, staticFiles, wordpressSourcePath } from './config.js';
import { execSync } from 'node:child_process';
import { resolve } from 'node:path';
import logSymbols from 'log-symbols';

(async () => {
  await main();
})();

async function main() {
  const program = new Command();

  program
    .option('-d, --debug', 'enable debug mode')
    .option('-f, --force', 'force overwriting files')
    .option('-v, --version', 'specify WordPress version', process.env.VITE_WORDPRESS_VERSION || '6.0')
    .parse(process.argv);

  const options = program.opts();

  if (options.debug) {
    console.log({ options })
  }

  console.log(/* let it breathe */);

  const command = [
    'npx',
    'degit',
    `wordpress/wordpress#${options.version}`,
    wordpressSourcePath
  ];

  if (options.force) {
    command.push('--force');
  }

  try {
    console.time(`Downloaded WordPress v${options.version}`);
    execSync(command.join(' '));
    console.timeEnd(`Downloaded WordPress v${options.version}`);
  } catch(error) {
    console.error(logSymbols.error, error?.toString());
    process.exit(1);
  }

  await Promise.all(staticFiles.map(async (file) => {
    const src = typeof file === 'string' ? file : file.src;
    const dest = typeof file === 'string' ? file : file.dest;

    console.log({
      src,
      dest,
      wordpressSourcePath,
      destinationPath
    })

    console.time(`Created 'static/${dest}'`);
      await copyFile(
        resolve(wordpressSourcePath, src),
        resolve(destinationPath, dest),
        options.force
      );
    console.timeEnd(`Created 'static/${dest}'`);
  }));
}
