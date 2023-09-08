#!/usr/bin/env node

import { Command } from 'commander';
import { copyFile } from './fs.js';
import { routeFiles, staticFiles, wordpressSourcePath } from './config.js';
import { handlePathValidation } from './utils.js';
import { basename, relative, resolve } from 'node:path';
import inquirer from 'inquirer';

(async () => {
  await main();
})();

async function main() {
	const program = new Command();

	program
    .option('-d, --debug', 'enable debug mode')
    .option('-f, --force', 'force overwriting files')
    .option('--no-favicon', 'skip inclusion of favicon.png', true)
    .option('--no-license', 'skip inclusion of license.txt', true)
    .option('--no-readme', 'skip inclusion of readme.html', true)
    .option('-r, --routes <path>', 'specify the SvelteKit routes path', relative(
      process.cwd(),
      resolve(process.cwd(), 'src', 'routes')
    ))
    .option('-s, --static <path>', 'specify the SvelteKit static path', relative(
      process.cwd(),
      resolve(process.cwd(), 'static')
    ))
    .option('-y, --yes', 'skip all answers', false)
		.parse(process.argv);

	const options = program.opts();

	if (options.debug) {
		console.log({ options })
	}

	console.log(/* let it breathe */);

  const answers = options.yes === false
    ? await inquirer
    .prompt([
      {
        type: 'input',
        name: 'routesPath',
        message: 'Specify the SvelteKit routes folder of your project',
        default: options.routes,
        async validate(value: string) {
          return await handlePathValidation(value, options.force);
        }
      },
      {
        type: 'input',
        name: 'staticPath',
        message: 'Specify the static folder of your project',
        default: options.static,
        async validate(value: string) {
          return await handlePathValidation(value, options.force);
        }
      },
      {
        type: 'confirm',
        name: 'includeFavicon',
        message: 'Include favicon.png',
        default: options.favicon
      },
      {
        type: 'confirm',
        name: 'includeLicense',
        message: 'Include license.txt',
        default: options.license
      },
      {
        type: 'confirm',
        name: 'includeReadme',
        message: 'Include readme.html',
        default: options.readme
      },
    ])
    : {
      routesPath: options.routes,
      staticPath: options.static,
      includeFavicon: true,
      includeLicense: true,
      includeReadme: true
    };

  if (options.debug) {
    console.log({ answers });
  }

  // Routes
  await Promise.all(routeFiles.map(async (file) => {
    console.time(`Created '${answers.routesPath}/${file}'`);
      await copyFile(
        resolve(__dirname, '..', 'src/routes', file),
        resolve(process.cwd(), answers.routesPath, file),
        options.force
      );
    console.timeEnd(`Created '${answers.routesPath}/${file}'`);
  }));

  // Static files
  await Promise.all(staticFiles.map(async file => {
    console.time(`Created '${answers.staticPath}/${file}'`);
      await copyFile(
        resolve(wordpressSourcePath, file),
        resolve(process.cwd(), answers.staticPath, file),
        options.force
      );
    console.timeEnd(`Created '${answers.staticPath}/${file}'`);
  }));

  if (answers.includeFavicon) {
    const file = 'wp-includes/images/w-logo-blue-white-bg.png';

    await copyFile(
      resolve(wordpressSourcePath, file),
      resolve(process.cwd(), answers.staticPath, 'favicon.png'),
      options.force
    );
  }

  if (answers.includeLicense) {
    const file = 'license.txt';

    await copyFile(
      resolve(wordpressSourcePath, file),
      resolve(process.cwd(), answers.staticPath, file),
      options.force
    );
  }

  if (answers.includeReadme) {
    const files = [
      'wp-admin/css/install.css',
      'wp-admin/images/wordpress-logo.png',
      'wp-admin/images/wordpress-logo.svg',
      'readme.html'
    ];

    await Promise.all(files.map(async (file) => {
      console.time(`Created '${answers.staticPath}/${file}'`);
        await copyFile(
          resolve(wordpressSourcePath, file),
          resolve(process.cwd(), answers.staticPath, file),
          options.force
        );
      console.timeEnd(`Created '${answers.staticPath}/${file}'`);
    }));
  }
}
