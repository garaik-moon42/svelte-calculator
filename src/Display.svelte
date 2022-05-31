<script>
    export let value;
    export let expression;
</script>
<div style={$$props.style}>
    <label for="calculator-display">{expression === undefined ? "" : expression}</label>
    <input id="calculator-display" type="text" bind:value readonly>
</div>
<style>
    div {
        position: relative;
    }
    label {
        position: absolute;
        right: 0;
        top: 0;
        text-align: right;
        padding: 2px 10px;
    }
    input {
        text-align: right;
        margin: 0;
        font-size: 300%;
        width: 100%;
        height: 100%;
    }
</style>
