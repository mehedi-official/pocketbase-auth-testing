<script>
	import { enhance } from '$app/forms';
</script>

<h1>Order Page</h1>

<form method="post" use:enhance>
	<button formaction="?/light">Light</button>
	<button formaction="?/dark">Dark</button>
	<button formaction="?/charcoal">Charcoal</button>
	<button formaction="?/banana">Banana</button>
</form>
