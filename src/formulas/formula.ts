import { parseCoordinateFormula, ParsedCoordinateFormula } from "./formula-parser";
import { Variables } from "./variables";
import calculate from "./coordinate-calculation";

export type ExpressionKind = 'add' | 'subtract' | 'multiply' | 'divide' | 'number' | 'variable' | 'degrees' | 'dot';
export type CoordinateKind = 'N' | 'S' | 'E' | 'W' | 'U';

export interface Expression {
    kind: ExpressionKind;
    operands?: Expression[];
    name?: string;
    value?: number;
}

export interface CoordinateFormulaExpression {
    kind: 'formula';
    coordType: CoordinateKind;
    expressions: Expression[];
}

export class CoordinateFormula {
    private _tree!: ParsedCoordinateFormula;
    private _variables?: Variables = undefined;
    private _result?: string = undefined;

    constructor(
        private _value: string,
        private _valueUpdater: (value: string) => void
    ) {
        this.updateTree();
        this.updateResult();
    }

    private updateTree() {
        this._tree = parseCoordinateFormula(this._value);
    }

    private updateResult() {
        if (this._variables !== undefined) {
            this._result = calculate(this.coordinateFormula, this._variables);
        } else {
            this._result = undefined;
        }
    }

    registerVariables() {
        if (this.coordinateFormula === undefined) {
            return;
        }

        const collectExpressionVariables = (node: Expression) => {
            switch (node.kind) {
                case 'variable':
                    this.variables!.register(node.name!);
                    break;
                case 'add':
                case 'subtract':
                case 'multiply':
                case 'divide':
                    collectExpressionVariables(node.operands![0]);
                    collectExpressionVariables(node.operands![1]);
                    break;
            }
        };
    
        for (const expression of this.coordinateFormula.expressions) {
            collectExpressionVariables(expression);
        }  
        this.updateResult();
    }

    get value() {
        return this._value;
    }

    set value(value: string) {
        this._valueUpdater(value);
    }

    get tree() {
        return this._tree;
    }

    get haveError() {
        return this.tree.haveError;
    }

    get error() {
        return this.tree.error;
    }

    get coordinateFormula() {
        return this.tree.formula;
    }

    get result() {
        return this._result;
    }

    get decimalResult() {
        if (this.result === undefined) {
            return undefined;
        }

        const parts = /^(N|S|E|W)\s*(\d+)°\s*(\d+\.\d+)$/.exec(this.result.trim());
        if (parts === null) {
            return undefined;
        }

        const coordinate = parseFloat(parts[2]) + parseFloat(parts[3]) / 60;
        if (parts[1].match(/S|W/)) {
            return -coordinate;
        } else {
            return coordinate;
        }
    }

    get variables() {
        return this._variables;
    }

    set variables(variables: Variables | undefined) {
        this._variables = variables;
        this.updateResult();
    }
}