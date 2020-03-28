
export type ExpressionKind = 'add' | 'subtract' | 'multiply' | 'divide' | 'number' | 'variable' | 'degrees' | 'dot';
export type CoordinateKind = 'N' | 'E' | 'U';

export interface Expression {
    kind: ExpressionKind;
    operands?: Expression[];
    name?: string;
    value?: number;
}

export interface CoordinateFormula {
    kind: CoordinateKind;
    expressions: Expression[];
}