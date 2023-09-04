<script lang="ts">
	import { base } from '$app/paths';
</script>

<svelte:head>
	{#if import.meta.env.VITE_HIDE_ROBOTS}
		<meta name="robots" content="max-image-preview:large, noindex, noarchive" />
	{/if}

  <!-- Make it look like WordPress link-tags -->
  <link rel="dns-prefetch" href="//s.w.org" />
	<link rel="stylesheet" id="dashicons-css" href={`wp-includes/css/dashicons.min.css?ver=${import.meta.env.VITE_WORDPRESS_VERSION}`} type="text/css" media="all" />
	<link rel="stylesheet" id="buttons-css" href={`wp-includes/css/buttons.min.css?ver=${import.meta.env.VITE_WORDPRESS_VERSION}`} type="text/css" media="all" />
	<link rel="stylesheet" id="forms-css" href={`wp-admin/css/forms.min.css?ver=${import.meta.env.VITE_WORDPRESS_VERSION}`} type="text/css" media="all" />
	<link rel="stylesheet" id="l10n-css" href={`wp-admin/css/l10n.min.css?ver=${import.meta.env.VITE_WORDPRESS_VERSION}`} type="text/css" media="all" />
	<link rel="stylesheet" id="login-css" href={`wp-admin/css/login.min.css?ver=${import.meta.env.VITE_WORDPRESS_VERSION}`} type="text/css" media="all" />
</svelte:head>

<!-- Initially hidden to prevent layout shifts and resemble default WordPress behaviour -->
<div id="login" hidden>
  <h1><a href="https://wordpress.org/">Powered by WordPress</a></h1>

  <slot />

  <p id="backtoblog">
    <a href={base || '/'}>&larr; Go to {import.meta.env.VITE_SITE_NAME || ''}</a>
  </p>
</div>

<div class="clear" />
