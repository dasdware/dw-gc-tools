import { h, FunctionalComponent } from 'preact';
import { CoordinateFormula } from "../formulas/formula";
import { errorMessage } from '../styles';

interface FormulaInputProps {
    formula: CoordinateFormula;
}

export const FormulaInput: FunctionalComponent<FormulaInputProps> = (props) =>
{
    return (
        <div>
            <div>
                <input value={props.formula.value} onInput={(e: any) => props.formula.value = e.target.value}></input>
            </div>
            {
                props.formula.haveError 
                    ? <div className={errorMessage}>{props.formula.error}</div> 
                    : ''
            }
        </div>
    );

}