import { style, media } from "typestyle";
import { maxWidth } from "csstips";
import { px } from "csx";

export const map = style(
    {
        flexGrow: 1,
        $nest: {
            '#show-settings': {
                display: 'none'
            },
        },
    },

    media({ maxWidth: px(800) },
        {
            $nest: {
                '&:not(.active)': {
                    display: 'none'
                },

                '#show-settings': {
                    display: 'inherit'
                }
            }
        })
);