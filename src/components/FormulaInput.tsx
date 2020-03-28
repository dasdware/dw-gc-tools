import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { h, FunctionalComponent } from 'preact';
import { useEffect } from "preact/hooks";
import { Variables } from "../utils/variables";
import { FormulaAST, parseToAST } from "../utils/parser";
import calculate from "../coordinate-calculation";


function collectVariables(ast: FormulaAST, variables: Variables) {
    const collectExpressionVariables = (node: any) => {
        switch (node.kind) {
            case 'variable':
                variables.register(node.name);
                break;
            case 'add':
            case 'subtract':
            case 'multiply':
            case 'divide':
                collectExpressionVariables(node.left);
                collectExpressionVariables(node.right);
                break;
        }
    };

    for (const expression of ast.root.expressions) {
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
            const ast = parseToAST(formula);
            if (!ast.haveError) {
                collectVariables(ast, props.variables);
                value = calculate(ast.root, props.variables);
            } else {
                error = ast.error;
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