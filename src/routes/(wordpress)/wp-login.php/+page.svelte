<script lang="ts">
	import { onMount } from 'svelte';
	import LoginForm from './components/Login/Login.svelte';
	import LostPasswordForm from './components/LostPassword/LostPassword.svelte';
	import NetlifyFormDetection from './components/NetlifyDetection/NetlifyDetection.svelte';

  let isLoading = true;
  let formType = '';

	onMount(async () => {
		// Prevent visible layout shifts
		const login = document.querySelector('#login');

		if (login) {
			login.removeAttribute('hidden');
		}

    const searchParams = new URLSearchParams(window.location.search);
		formType = searchParams.get('action') === 'lostpassword' ? 'lostpassword' : 'login';

		// Mimicking default WordPress behaviour
		document.body.classList.add('login', 'js', 'login-action-login', 'wp-core-ui', 'locale-en-us');

    isLoading = false;
	});
</script>

{#if isLoading}
  <!-- This is a required for form-detection only -->
	<NetlifyFormDetection />
{:else}
  {#if formType === 'lostpassword'}
    <LostPasswordForm />
  {:else}
    <LoginForm />
  {/if}
{/if}
