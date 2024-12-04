<script lang="ts">
	let { data } = $props();
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { pb } from '$lib/database';
</script>

<h1>Signin</h1>

<form action="?/login" method="post">
	<div>
		<label for="email"
			>Email Address
			<input type="email" name="email" />
		</label>
	</div>
	<div>
		<label for="password"
			>Password
			<input type="password" name="password" />
		</label>
	</div>

	<div>
		<button type="submit">Signin to your account</button>
	</div>
</form>

<form method="post" action="?/google">
	<button type="submit">Signin with google</button>
</form>
