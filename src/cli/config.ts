import { resolve } from 'node:path';

export const routeFiles = [
  '(wordpress)/+layout.svelte',
  '(wordpress)/wp-admin/[...slug]/+page.server.ts',
  '(wordpress)/wp-admin/+page.server.js',
  '(wordpress)/wp-login.php/+page.ts',
  '(wordpress)/wp-login.php/+page.svelte',
  '(wordpress)/wp-login.php/components/Login/index.ts',
  '(wordpress)/wp-login.php/components/Login/Login.svelte',
  '(wordpress)/wp-login.php/components/LostPassword/index.ts',
  '(wordpress)/wp-login.php/components/LostPassword/LostPassword.svelte',
  '(wordpress)/wp-login.php/components/NetlifyDetection/index.ts',
  '(wordpress)/wp-login.php/components/NetlifyDetection/NetlifyDetection.svelte'
];

export const staticFiles = [
  'wp-admin/css/forms.min.css',
  'wp-admin/css/l10n.min.css',
  'wp-admin/css/login.min.css',
  'wp-admin/images/w-logo-blue.png',
  'wp-includes/css/buttons.min.css',
  'wp-includes/css/dashicons.min.css'
];

export const prepareStaticFiles = [
  ...staticFiles,
  // the following files are treated separately in install-mode
  'license.txt',
  'readme.html',
  'wp-admin/css/install.css',
  'wp-admin/images/wordpress-logo.png',
  'wp-admin/images/wordpress-logo.svg',
  'wp-includes/images/w-logo-blue-white-bg.png',
];

export const wordpressSourcePath = resolve(__dirname, '..', 'node_modules', '.wordpress');
export const destinationPath = resolve(process.cwd(), 'static');
