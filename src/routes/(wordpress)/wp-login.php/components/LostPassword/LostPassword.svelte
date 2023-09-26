<script lang="ts">
	import { onMount } from 'svelte';
	import { randomResponse } from '../../lib/utils';
	import { page } from '$app/stores';

	let errorMessage = '';
  let hasError = false;

	let formElement: HTMLFormElement;
	let userInput: HTMLInputElement;
	let userLogin: string = '';

	onMount(() => {
		// Mimicking default WordPress behaviour
		userInput.focus();
	});

	const submitHandler = async () => {
		const data = new URLSearchParams();

		for (const [ key, value ] of new FormData(formElement)) {
			data.append(key, String(value));
		}

		if ([...new Set(data.keys())].length) {
			await fetch($page.url.href, {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: data
			});
		}

		setTimeout(() => {
			if (userLogin.length) {
				errorMessage = '<strong>Error</strong>: There is no account with that username or email address.';
			} else {
				errorMessage = '<strong>Error</strong>: Please enter a username or email address.';
			}
		}, randomResponse());

    setTimeout(() => {
      hasError = false;
    }, Number(import.meta.env.VITE_ARTIFICIAL_DELAY) || 600);
	};
</script>

<svelte:head>
  <title>Lost Password &lsaquo; {import.meta.env.VITE_SITE_NAME ? `${import.meta.env.VITE_SITE_NAME} — WordPress` : 'WordPress'}</title>
</svelte:head>

<p class="message">Please enter your username or email address. You will receive an email message with instructions on how to reset your password.</p>

{#if errorMessage.length}
	<div id="login_error">
		{@html errorMessage}<br />
	</div>
{/if}

<form data-netlify="true" name="lostpasswordform" id="lostpasswordform" action="/wp-login.php?action=lostpassword" method="post" class:shake={hasError} on:submit|preventDefault={submitHandler} bind:this={formElement}>
	<!-- Required for Netlify Forms -->
	<input type="hidden" name="form-name" value="lostpasswordform" />

	<p>
		<label for="user_login">Username or Email Address</label>
		<input type="text" name="user_login" id="user_login" class="input" bind:value={userLogin} size="20" autocapitalize="off" bind:this={userInput} />
	</p>

	<input type="hidden" name="redirect_to" value="" />

	<p class="submit">
		<input type="submit" name="wp-submit" id="wp-submit" class="button button-primary button-large" value="Get New Password" />
	</p>
</form>

<p id="nav">
	<a data-sveltekit-reload href="wp-login.php">Log in</a>
</p>
