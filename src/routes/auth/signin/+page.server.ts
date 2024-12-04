import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	login: async ({ request, locals }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		if (!email || !password) return;

		await locals.pb.collection('users').authWithPassword(email?.toString(), password?.toString());
		throw redirect(303, '/admin/dashboard');
	},
	google: async ({ cookies, locals, url }) => {
		const authMethods = await locals.pb.collection('users').listAuthMethods();
		if (!authMethods) {
			return { authProviders: '' };
		}
		const redirectURI = `${url.origin}/oauth`;
		const googleAuthProvider = authMethods.authProviders[0];

		const googleRedirectURI = `${googleAuthProvider.authUrl}${redirectURI}`;

		const state = googleAuthProvider.state;
		const verifier = googleAuthProvider.codeVerifier;

		cookies.set('state', state, { path: '/' });
		cookies.set('verifier', verifier, { path: '/' });

		// cookies.set('mim', 'hello world', {
		//     path: '/',
		//     sameSite: 'lax'
		// });

		console.log('State: ', state);
		console.log('Verifier: ', verifier);
		throw redirect(302, googleRedirectURI);
	}
};
