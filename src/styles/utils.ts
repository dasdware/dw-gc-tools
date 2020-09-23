import { style, cssRule, classes } from "typestyle";
import { flex, horizontal, height } from "csstips";
import { viewHeight, em, ColorHelper } from "csx";
import { NestedCSSProperties } from "typestyle/lib/types";
import { measurements, colors } from "./variables";


// Mixins
export const fieldBorder = (color: ColorHelper) => {
    return {
        border: `${measurements.field.borderSize} solid ${color}`,
        borderRadius: measurements.field.borderRadius
    }
}
