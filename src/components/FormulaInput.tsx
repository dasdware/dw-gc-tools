import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { h, FunctionalComponent } from 'preact';
import { useEffect } from "preact/hooks";
import { Variables } from "../utils/variables";
import calculate from "../coordinate-calculation";
import { parseCoordinateFormula, ParsedCoordinateFormula } from "../formulas/formula-parser";
import { Expression } from "../formulas/formula";


function collectVariables(parsedFormula: ParsedCoordinateFormula, variables: Variables) {
    const collectExpressionVariables = (node: Expression) => {
        switch (node.kind) {
            case 'variable':
                variables.register(node.name!);
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

    for (const expression of parsedFormula.formula!.expressions) {
        collectExpressionVariables(expression);
    }  
}

interface FormulaInputProps {
    name: string;
    initialValue: string;
    variables: Variables;
}

export const FormulaInput: FunctionalComponent<FormulaInputProps> = (props) =>
{
    const [formula, setFormula] = useLocalStorageState(props.initialValue, props.name);
    let value: string | undefined = '';
    let error: string | undefined = '';

    // useEffect(
    //     () => {
            const parsedFormula = parseCoordinateFormula(formula);
            if (!parsedFormula.haveError) {
                collectVariables(parsedFormula, props.variables);
                value = calculate(parsedFormula.formula, props.variables);
            } else {
                error = parsedFormula.error;
            }
    //     },
    //     [formula, props.variables]
    // )

    return (
        <div>
            <div>
                <input value={formula} onInput={(e: any) => setFormula(e.target.value)}></input>
                {value}
            </div>
            {error}
        </div>
    );

}