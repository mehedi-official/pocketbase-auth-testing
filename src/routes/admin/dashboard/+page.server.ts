import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { pb } from '$lib/database';

export const load = (async ({ cookies, locals }) => {
	let theme = cookies.get('theme');
	console.log(locals.banana);
	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, locals }) => {
		await locals.pb.authStore.clear();
		redirect(303, '/auth/signin');
	}
};
