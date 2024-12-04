import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	// let names = cookies.get('pb_auth');
	let theme = cookies.get('theme');
	console.log(theme);

	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	light: async ({ locals, cookies }) => {
		console.log('Locals: ', locals.preference);
		cookies.set('theme', 'light', { path: '/', maxAge: 360000 });
	},
	dark: async ({ locals, cookies }) => {
		console.log('Locals: ', locals.preference);
		cookies.set('theme', 'dark', { path: '/', maxAge: 360000 });
	},
	charcoal: async ({ locals, cookies }) => {
		console.log('Locals: ', locals.preference);
		cookies.set('theme', 'charcoal', { path: '/', maxAge: 360000 });
	},
	banana: async ({ locals }) => {
		locals.banana = 'banana';
		console.log('successful banana');
	}
};
