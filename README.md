# netlify-wp-login-honeypot

*This repository is work in progress*

A SvelteKit template that mocks a WordPress login page. It uses Netlify Forms to record all activity.

## Installation

### Degit

You can use this as a template for your SvelteKit project. However, it's probably not up-to-date with the latest SvelteKit version.

```sh
npx degit idleberg/netlify-wp-login-honeypot
cd netlify-wp-login-honeypot
pnpm install
```

### CLI

To integrate the login routes to your existing SvelteKit project, you can use the CLI.

```sh
npm i netlify-wp-login-honeypot -S
wphp install
```

## Configuration

You can change some of the default behaviour by setting the following environment variables.

``env
# Default values
VITE_SITE_NAME=WordPress
VITE_WORDPRESS_VERSION=6.0
VITE_ARTIFICIAL_DELAY=2000
VITE_HIDE_ROBOTS=true
```

## License

This work is licensed under [The MIT License](LICENSE)
