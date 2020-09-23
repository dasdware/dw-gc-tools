import { ColorHelper } from "csx";
import { measurements } from "./variables";

// Mixins
export const fieldBorder = (color: ColorHelper) => {
  return {
    border: `${measurements.field.borderSize} solid ${color}`,
    borderRadius: measurements.field.borderRadius,
  };
};
