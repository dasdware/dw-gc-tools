// @ts-ignore
import parser from '../coordinate-calculator.pegjs';

export interface FormulaAST {
    haveError: boolean;
    root?: any;
    error?: string;
}

export function parseToAST(formula: string): FormulaAST {
    let ast = null;
    let error = null;
    let value = null;
    try {
        ast = parser.parse(formula);
        return { root: ast, haveError: false };
    } catch (e) {
        return { haveError: true, error: e.message };
    } 
}
