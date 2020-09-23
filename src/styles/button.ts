import { style, classes } from "typestyle";
import { fieldBorder } from "./utils";
import { colors, measurements } from "./variables";

// Button
export const button = style(
    fieldBorder(colors.primary),
    {
        color: colors.primary.toString(),

        display: 'block',
        width: measurements.field.size,
        height: measurements.field.size,

        cursor: 'pointer',

        position: 'relative',

        $nest: {
            'svg': {
                display: 'block',

                position: 'absolute',
                margin: 0,

                top: '50%',
                left: '50%',

                transform: 'translate(-50%, -50%)'
            },

            '&:hover:not(.disabled)': {
                color: colors.primaryHover.toString(),
                borderColor: colors.primaryHover.toString()
            },

            '&.disabled': {
                borderColor: colors.field.border.toString(),
                color: colors.field.border.toString(),
                cursor: 'default'
            }
        }
    }
);

export const buttonClasses = (enabled: boolean) => 
    (enabled) ? button : classes(button, 'disabled');
