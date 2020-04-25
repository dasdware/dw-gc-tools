// @ts-ignore
import parser from './coordinate.pegjs';
import { CoordinateFormulaExpression } from './formula';

export interface ParsedCoordinateFormula {
    haveError: boolean;
    formula?: CoordinateFormulaExpression;
    error?: string;
}

export function parseCoordinateFormula(formula: string): ParsedCoordinateFormula {
    try {
        return { 
            formula: <CoordinateFormulaExpression>parser.parse(formula.trim()), 
            haveError: false 
        };
    } catch (e) {
        return { 
            haveError: true, 
            error: e.message 
        };
    } 
}
