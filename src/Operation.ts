export class Operation {
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
