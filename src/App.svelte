<script lang="ts">
	import Calculator from "./Calculator.svelte";
	let greeting = 'Hellobello';
	export let name: string;
</script>
<Calculator class="calculator" />
<style>
	:global(html, body, main) {
		width: 100%;
		height: 100%;
	}

	:global(.calculator) {
		width: 100%;
		height: 100%;
	}
</style>