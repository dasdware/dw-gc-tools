// @ts-ignore
import parser from './coordinate.pegjs';
import { CoordinateFormula } from './formula';

export interface ParsedCoordinateFormula {
    haveError: boolean;
    formula?: CoordinateFormula;
    error?: string;
}

export function parseCoordinateFormula(formula: string): ParsedCoordinateFormula {
    try {
        return { 
            formula: <CoordinateFormula>parser.parse(formula), 
            haveError: false 
        };
    } catch (e) {
        return { 
            haveError: true, 
            error: e.message 
        };
    } 
}
