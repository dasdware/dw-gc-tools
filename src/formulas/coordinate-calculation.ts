import { Variables } from "./variables";
import { Expression } from "./formula";

function calculateNumber(expression: Expression, variables: Variables): number {
    switch (expression.kind) {
        case 'variable': return variables.get(expression.name!);
        case 'number': return <number>expression.value;
        case 'add': return calculateNumber(expression.operands![0], variables) + calculateNumber(expression.operands![1], variables);
        case 'subtract': return calculateNumber(expression.operands![0], variables) - calculateNumber(expression.operands![1], variables);
        case 'multiply': return calculateNumber(expression.operands![0], variables) * calculateNumber(expression.operands![1], variables);
        case 'divide': return calculateNumber(expression.operands![0], variables) / calculateNumber(expression.operands![1], variables);
        default:
            console.warn('Unknown node kind:', expression.kind);
            return NaN;
    }
}

function calculateExpression(expression: Expression, variables: Variables) {
    switch (expression.kind) {
        case 'degrees': return '° ';
        case 'dot': return '.';
        default: return Math.round(calculateNumber(expression, variables)).toString();
    }
}

export default function calculate(ast: any, variables: Variables) {
    let result = ast.coordType + ' ';

    for (const expression of ast.expressions) {
        result = result + calculateExpression(expression, variables);
    }

    return result;
}
