#!/usr/bin/env node

import { Command } from 'commander';
import { resolve } from 'node:path';
import { promises as fs } from 'node:fs';
import { fileURLToPath } from 'node:url'

(async () => {
  await main();
})();

async function main() {
  const program = new Command();
  const version = await getVersion();

	program
		.name('wphp')
		.version(version)
		.command('prepare', 'prepares all required WordPress assets to be in place')
		.command('install', 'installs the routes in your existing project')

	program.parse(process.argv);
}

async function getVersion() {
	const { version } = JSON.parse(
    await fs.readFile(resolve(__dirname, '..', 'package.json'), 'utf8')
	);

	return version || 'dev';
}
