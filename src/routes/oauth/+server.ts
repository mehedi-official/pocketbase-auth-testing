import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = async ({ locals, url, cookies }) => {
	const redirectURI = `${url.origin}/oauth`;
	const expectedState = cookies.get('state');
	const expectedVerifier = cookies.get('verifier');

	const state = url.searchParams.get('state');
	const code = await url.searchParams.get('code');

	// const mim = cookies.get('mim');
	console.log('Expected Cookie Verifier: ', expectedVerifier);
	console.log('Code: ', code);

	const authMethods = await locals.pb.collection('users').listAuthMethods();

	if (!authMethods.authProviders) {
		console.log('No auth providers');
	}
	const googleAuthProvider = authMethods.authProviders[0];

	if (!googleAuthProvider) {
		console.log('provider not found');
	}

	if (expectedState !== state) {
		console.log('state mismatch');
	}

	try {
		const authData = await locals.pb
			.collection('users')
			.authWithOAuth2Code(
				googleAuthProvider.name,
				String(code),
				String(expectedVerifier),
				redirectURI
			);
		// console.log(authData);
		console.log(locals.pb.authStore.isValid);
	} catch (error) {
		console.log('Error signing up with Oauth: ', error);
	}

	throw redirect(303, '/admin/dashboard');
};
