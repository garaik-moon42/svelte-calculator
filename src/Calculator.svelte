<script lang="ts">
    import Display from "./Display.svelte";
    import Button from './Button.svelte';
    import { Operation } from "./Operation";
    import { create as mathJsCreate, all as mathJsAll} from "mathjs";

    let value = "0";
    let valueComplete = true;
    let expression: (string|Operation)[] = [];
    let displayedExpression: string = "";

    const mathjs = mathJsCreate(mathJsAll);
    mathjs.config({
        number: "BigNumber",
        precision: 64
    });

    function composeDisplayedExpression():string {
        return expression.map(item => item instanceof Operation ? item.label : item).join(' ');
    }  

    function clickDigit(digit: string):void {
        if (value === "0" || valueComplete) {
            value = digit;
            valueComplete = false;
        }
        else {
            value += digit;
        }
    }

    function clickPoint() {
        if (value.indexOf(".") === -1) {
            value += ".";
            valueComplete = false;
        }
    }

    function clickOperation(op: Operation) {
        expression = [...expression, value, op];
        displayedExpression = composeDisplayedExpression();
        valueComplete = true;45
    }

    function clickResult() {
        if (expression.length > 0) {
            expression = [...expression, value];
            displayedExpression = composeDisplayedExpression() + " =";
            let exprToEval = expression.map(item => item instanceof Operation ? item.expr : item).join(' ');
            value = mathjs.evaluate(exprToEval);
            valueComplete = true;
            expression = [];
        }
    }

    function clickClear() {
        value = "0";
        if (valueComplete) {
            expression = [];
            displayedExpression = composeDisplayedExpression();
        }
        else {
            valueComplete = true;
        }
    }

    function keyPress(e: KeyboardEvent) {
        if (e.key >= '0' && e.key <= '9') {
            clickDigit(e.key);
        }
        else if (e.key === '+') {
            clickOperation(Operation.ADD);
        }
        else if (e.key === '-') {
            clickOperation(Operation.SUBTRACT);
        }
        else if (e.key === '*') {
            clickOperation(Operation.MULTIPLY);
        }
        else if (e.key === '/') {
            clickOperation(Operation.DIVIDE);
        }
        else if (e.key === "." || e.key === ",") {
            clickPoint();
        }
        else if (e.key === 'Backspace' || e.key === 'Delete') {
            clickClear();
        }
        else if (e.key === "Enter") {
            clickResult();
        }
        console.log(e.key);
    }
</script>
<div class={$$props.class} on:keyup={keyPress}>
        <Display value={value} expression={displayedExpression} style="grid-column: 1 / 5 " />

        <Button label="C" on:click={clickClear} />
        <Button label={Operation.DIVIDE.label} on:click={() => clickOperation(Operation.DIVIDE)} />
        <Button label={Operation.MULTIPLY.label} on:click={() => clickOperation(Operation.MULTIPLY)} />
        <Button label={Operation.SUBTRACT.label} on:click={() => clickOperation(Operation.SUBTRACT)} />

        <Button label="7" on:click={() => clickDigit('7')} />
        <Button label="8" on:click={() => clickDigit('8')} />
        <Button label="9" on:click={() => clickDigit('9')} />
        <Button label={Operation.ADD.label} on:click={() => clickOperation(Operation.ADD)} style="grid-column: 4; grid-row: 3 / span 2" />

        <Button label="4" on:click={() => clickDigit('4')} />
        <Button label="5" on:click={() => clickDigit('5')} />
        <Button label="6" on:click={() => clickDigit('6')} />

        <Button label="1" on:click={() => clickDigit('1')} />
        <Button label="2" on:click={() => clickDigit('2')} />
        <Button label="3" on:click={() => clickDigit('3')} />
        <Button label="=" on:click={clickResult} style="grid-column: 4; grid-row: 5 / span 2"/>

        <Button label="0" on:click={() => clickDigit('0')} style="grid-column: 1 / span 2;" />
        <Button label="." on:click={clickPoint} />
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