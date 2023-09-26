import { redirect } from '@sveltejs/kit';

export function load({ url }) {
	throw redirect(302, `/wp-login.php?redirect_to=${encodeURIComponent(url.href + '/')}&reauth=1`);
}
