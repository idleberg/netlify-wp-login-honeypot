<script lang="ts">
	import { randomResponse } from '../../lib/utils';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let errorMessage: string = '';
  let hasError = false;
	let hidePassword: boolean = true;

	let formElement: HTMLFormElement;
	let loginInput: HTMLInputElement;
	let userLogin: string = '';
	let userPass: string = '';

	onMount(() => {
		// Mimicking default WordPress behaviour
		loginInput.focus();
		loginInput.select();
	});

	const togglePasswordVisibility = () => {
		hidePassword = !hidePassword;
	};

	const submitHandler = async () => {
    errorMessage = '';
		const data = new URLSearchParams();

		for (const [ key, value ] of new FormData(formElement)) {
			data.append(key, String(value));
		}

		if ([...new Set(data.keys())].length) {
			fetch($page.url.href, {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: data
			});
		}

		setTimeout(() => {
			if (!userLogin.length || !userPass.length) {
				if (!userLogin.length) {
					errorMessage += '<strong>Error</strong> The username field is empty.';
				}

        if (!userLogin.length && !userPass.length) {
          errorMessage += '<br />';
        }

        if (!userPass.length) {
					errorMessage += '<strong>Error</strong> The password field is empty.';
				}
			} else {
				errorMessage = `<strong>Error</strong> The username <strong>${userLogin}</strong> is not registered on this site. If you are unsure of your username, try your email address instead.`;
			}

      hasError = true;
		}, randomResponse());

    setTimeout(() => {
      hasError = false;
    }, 600);
	};
</script>

<svelte:head>
  <title>Log In &lsaquo; {import.meta.env.VITE_SITE_NAME ? `${import.meta.env.VITE_SITE_NAME} — WordPress` : 'WordPress'}</title>
</svelte:head>

{#if errorMessage.length}
	<div id="login_error">
		{@html errorMessage}<br />
	</div>
{/if}

<form data-netlify="true" name="loginform" id="loginform" action="/wp-login.php" method="post" class:shake={hasError} on:submit|preventDefault={submitHandler} bind:this={formElement}>
	<!-- Required for Netlify Forms -->
	<input type="hidden" name="form-name" value="loginform" />

	<p>
		<label for="user_login">Username or Email Address</label>
		<input type="text" name="log" id="user_login" class="input" bind:value={userLogin} size="20" autocapitalize="off" bind:this={loginInput} />
	</p>

	<div class="user-pass-wrap">
		<label for="user_pass">Password</label>
		<div class="wp-pwd">
			{#if hidePassword}
				<input type="password" name="pwd" id="user_pass" class="input password-input" bind:value={userPass} size="20" />
			{:else}
				<input type="text" name="pwd" id="user_pass" class="input password-input" bind:value={userPass} size="20" />
			{/if}

			<button type="button" class="button button-secondary wp-hide-pw hide-if-no-js" data-toggle="0" aria-label="{hidePassword ? 'Show' : 'Hide'} password" on:click={togglePasswordVisibility}>
				<span class="dashicons dashicons-{hidePassword ? 'visibility' : 'hidden'}" aria-hidden="true" />
			</button>
		</div>
	</div>

	<p class="forgetmenot"><input name="rememberme" type="checkbox" id="rememberme" value="forever" /> <label for="rememberme">Remember Me</label></p>

	<p class="submit">
    <input type="submit" name="wp-submit" id="wp-submit" class="button button-primary button-large" value="Log In" />
		<input type="hidden" name="redirect_to" value="{$page.url.origin}/wp-admin/" />
		<input type="hidden" name="testcookie" value="1" />
	</p>
</form>

<p id="nav">
	<a data-sveltekit-reload href="wp-login.php?action=lostpassword">Lost your password?</a>
</p>
