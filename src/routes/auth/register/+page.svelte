<script>
	import { enhance } from '$app/forms';
</script>

<h1>Register</h1>

<form action="" method="post" use:enhance>
	<div>
		<label for="fullname"
			>Full Name
			<input type="text" name="fullname" />
		</label>
	</div>
	<div>
		<label for="username"
			>username
			<input type="text" name="username" />
		</label>
	</div>
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
		<button type="submit">Create an Account</button>
	</div>
</form>
