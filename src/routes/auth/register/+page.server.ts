import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

export const load = (async (event) => {
	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const name = formData.get('fullname');
		const username = formData.get('username');
		const email = formData.get('email');
		const password = formData.get('password');

		const record = await pb.collection('users').create({
			name: name,
			email: email,
			username: username,
			password: password,
			passwordConfirm: password,
			emailVisibility: true
		});

		console.log(record);
		throw redirect(303, '/admin/dashboard');
	}
};
