<script>
	import '../app.css';
</script>

<div class="layout">
	<main>
		<slot />
	</main>

	<footer>
		&copy; <a class="text-blue-600" href="https://teo.fyi">Teo Tsivranidis</a> Fall 2024
	</footer>
</div>

<style>
	footer {
		font-family: 'Times New Roman', Times, serif;
		border-top: 1px black solid;
		padding: 1rem;
		text-align: center;
	}

	footer a:hover {
		font-style: italic;
	}
</style>
