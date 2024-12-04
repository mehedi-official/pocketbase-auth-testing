import { pb } from '$lib/database';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import PocketBase from 'pocketbase';

// const pb = new PocketBase('http://127.0.0.1:8090')

const auth: Handle = async ({ event, resolve }) => {
	// load the store data from the request cookie string
	// pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '')
	// try {
	//   // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
	//   if (pb.authStore.isValid) {
	//     await pb.collection('users').authRefresh()
	//   }
	// } catch (_) {
	//   // clear the auth store on failed refresh
	//   pb.authStore.clear();
	// }

	event.locals.pb = pb;
	event.locals.user = pb.authStore.model;

	let theme = event.cookies.get('theme');
	if (theme === undefined) {
		event.cookies.set('theme', 'light', { path: '/', maxAge: 360000 });
		event.locals.preference = 'light';
	}
	event.locals.preference = theme;
	const response = await resolve(event);

	// send back the default 'pb_auth' cookie to the client with the latest store state
	// response.headers.append(
	//   'set-cookie',
	//   pb.authStore.exportToCookie({ httpOnly: false })
	// );

	// // console.log(event.locals.pb.authStore.isValid);
	// console.log(event.locals.pb.authStore.isValid);

	return response;
};

const protectRoutes: Handle = async ({ event, resolve }) => {
	if (!event.locals.pb.authStore.isValid) {
		if (event.url.pathname.startsWith('/admin')) {
			console.log('invalid user');
			throw redirect(307, '/auth/signin');
		}
	} else if (event.locals.pb.authStore.isValid) {
		if (event.url.pathname.startsWith('/auth')) {
			throw redirect(307, '/admin/dashboard');
		}
	}
	const response = await resolve(event);
	return response;
};

export const handle = sequence(auth);
