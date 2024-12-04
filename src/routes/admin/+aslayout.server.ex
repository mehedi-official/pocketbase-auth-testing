import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({locals}) => {
    const isValidUser = locals.pb.authStore.isValid;
    if(!isValidUser) {
        console.log('Invalid user:');
        // throw redirect(302, '/auth/signin')
    }
    else {
        console.log('Valid user')
    }
    return {};
}) satisfies LayoutServerLoad;