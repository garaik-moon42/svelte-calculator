<script lang="ts">
    import { createEventDispatcher } from "svelte";
    export let label = 'This is a button';
</script>
<button style={$$props.style} on:click>{label}</button>
<style>
    button {
        width: 100%;
        font-size: 200%;
        padding: 0;
        margin: 0;
    }
</style>