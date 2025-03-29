<script>
	import '../app.css';
</script>

<div class="layout">
	<main class="min-h-screen">
		<slot />
	</main>

	<footer class="pb-2">
		a sketch by <a class="text-blue-600" href="https://teo.fyi">Teo</a> during Fall 2024
	</footer>
</div>

<style>
	footer {
		text-align: center;
	}

	footer a:hover {
		font-style: italic;
	}
</style>
