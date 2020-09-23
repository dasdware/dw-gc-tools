import { cssRule } from "typestyle";
import { colors, measurements } from "./variables";
import { viewHeight } from "csx";
import { fieldBorder } from "./utils";

// Global rules
cssRule('body', {
    background: colors.background.toString(),
    color: colors.text.toString(),
    fontFamily: 'PT Sans, sans-serif',

    margin: 0,
    padding: 0,
    minHeight: viewHeight(100)
});

cssRule('input', 
    fieldBorder(colors.field.border),
    {
        background: colors.background.toString(),
        padding: measurements.field.padding,
        height: measurements.field.size
    }
);
