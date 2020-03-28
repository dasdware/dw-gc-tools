import { Variables } from "./utils/variables";

function calculateNumber(node: any, variables: Variables): number {
    switch (node.kind) {
        case 'variable': return variables.get(node.name);
        case 'number': return <number>node.value;
        case 'add': return calculateNumber(node.left, variables) + calculateNumber(node.right, variables);
        case 'subtract': return calculateNumber(node.left, variables) - calculateNumber(node.right, variables);
        case 'multiply': return calculateNumber(node.left, variables) * calculateNumber(node.right, variables);
        case 'divide': return calculateNumber(node.left, variables) / calculateNumber(node.right, variables);
        default:
            console.warn('Unknown node kind:', node.kind);
            return NaN;
    }
}

function calculateExpression(node: any, variables: Variables) {
    switch (node.kind) {
        case 'degrees': return '° ';
        case 'dot': return '.';
        default: return Math.round(calculateNumber(node, variables)).toString();
    }
}

export default function calculate(ast: any, variables: Variables) {
    let result = ast.coordType + ' ';

    for (const expression of ast.expressions) {
        result = result + calculateExpression(expression, variables);
    }

    return result;
}
