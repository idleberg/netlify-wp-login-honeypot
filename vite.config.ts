import { defineConfig } from 'vite';
import { schema } from './environment';
import { sveltekit } from '@sveltejs/kit/vite';
import valibot from 'vite-plugin-valibot-env';

export default defineConfig({
  plugins: [
    sveltekit(),
    valibot(schema)
  ]
});
