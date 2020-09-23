import { Expression } from "./formula";
import { Variables } from "./variables";

function calculateNumber(
  expression: Expression,
  variables?: Variables
): number {
  switch (expression.kind) {
    case "variable":
      if (variables !== undefined) {
        return variables.get(expression.name!);
      } else {
        return NaN;
      }
    case "number":
      return <number>expression.value;
    case "add":
      return (
        calculateNumber(expression.operands![0], variables) +
        calculateNumber(expression.operands![1], variables)
      );
    case "subtract":
      return (
        calculateNumber(expression.operands![0], variables) -
        calculateNumber(expression.operands![1], variables)
      );
    case "multiply":
      return (
        calculateNumber(expression.operands![0], variables) *
        calculateNumber(expression.operands![1], variables)
      );
    case "divide":
      return (
        calculateNumber(expression.operands![0], variables) /
        calculateNumber(expression.operands![1], variables)
      );
    default:
      console.warn("Unknown node kind:", expression.kind);
      return NaN;
  }
}

function calculateExpression(expression: Expression, variables?: Variables) {
  switch (expression.kind) {
    case "degrees":
      return "° ";
    case "dot":
      return ".";
    default:
      return Math.round(calculateNumber(expression, variables)).toString();
  }
}

export default function calculate(ast: any, variables?: Variables) {
  if (ast == undefined) {
    return undefined;
  }

  let result = ast.coordType + " ";

  for (const expression of ast.expressions) {
    result = result + calculateExpression(expression, variables);
  }

  return result;
}
