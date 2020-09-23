import { style } from "typestyle";
import { measurements } from "./variables";

// Variables
export const variableTable = {
  entry: style({
    marginBottom: measurements.sidebar.padding,
    $nest: {
      ":nth-child(1)": {
        display: "inline-block",
        width: measurements.field.size,
      },
      ":nth-child(2)": {
        display: "inline-block",
        width: `calc(100% - 2 * ${measurements.field.size} - 3 * ${measurements.sidebar.padding})`,
      },
      ":nth-child(3)": {
        float: "right",
      },
    },
  }),
};
