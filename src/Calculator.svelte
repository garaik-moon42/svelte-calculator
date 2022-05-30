<script lang="ts">
    import Display from "./Display.svelte";
    import Button from './Button.svelte';

    class Operation {
        public static ADD = new Operation('+', '+');
        public static SUBTRACT = new Operation('-', '-');
        public static MULTIPLY = new Operation('×', '*');
        public static DIVIDE = new Operation('÷', '/');

        readonly label: string;
        readonly expr: string;

        private constructor(label: string, expr: string) {
            this.label = label;
            this.expr = expr;
        }
    }

    let value = "0";
    let postOperatorMode = false;
    let expression: (string|Operation)[] = [];
    $: displayedExpression = expression.map(item => {
            if (item instanceof Operation) {
                return item.expr;
            }
            else {
                return item;
            }
        }).join(' ');

    function clickDigit(digit: number):void {
        if (value === "0" || postOperatorMode) {
            value = "" + digit;
            postOperatorMode = false;
        }
        else {
            value += "" + digit;
        }
    }

    function clickOperation(op: Operation) {
        if (postOperatorMode) {
            expression = [...expression.slice(0, -1), op];
        }
        else {
            if (value !== "0") {
                expression = [...expression, value, op];
                postOperatorMode = true;
            }
        }
    }

    function clickResult() {
        if (expression.length > 0) {
            if (postOperatorMode) {
                expression = expression.slice(0, -1);
            }
            else {
                expression = [...expression, value];
            }
            let toEval = expression.join(' ');
            value = eval(toEval);
            expression = [];
            postOperatorMode = true;
        }
    }

</script>
<div class={$$props.class}>
        <Display value={value} expression={displayedExpression} style="grid-column: 1 / 5 " />

        <Button label="C" />
        <Button label={Operation.DIVIDE.label} on:click={() => clickOperation(Operation.DIVIDE)} />
        <Button label={Operation.MULTIPLY.label} on:click={() => clickOperation(Operation.MULTIPLY)} />
        <Button label={Operation.SUBTRACT.label} on:click={() => clickOperation(Operation.SUBTRACT)} />

        <Button label="7" on:click={() => clickDigit(7)} />
        <Button label="8" on:click={() => clickDigit(8)} />
        <Button label="9" on:click={() => clickDigit(9)} />
        <Button label={Operation.ADD.label} on:click={() => clickOperation(Operation.ADD)} style="grid-column: 4; grid-row: 3 / span 2" />

        <Button label="4" on:click={() => clickDigit(4)} />
        <Button label="5" on:click={() => clickDigit(5)} />
        <Button label="6" on:click={() => clickDigit(6)} />

        <Button label="1" on:click={() => clickDigit(1)} />
        <Button label="2" on:click={() => clickDigit(2)} />
        <Button label="3" on:click={() => clickDigit(3)} />
        <Button label="=" on:click={() => clickResult()} style="grid-column: 4; grid-row: 5 / span 2"/>

        <Button label="0" on:click={() => clickDigit(0)} style="grid-column: 1 / span 2;" />
        <Button label="." />
</div>
<style>
    div {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(6, 1fr);
        gap: 10px 10px;
    }

    :global(.calculator p button) {
        border: 1px solid green;
    }
</style>