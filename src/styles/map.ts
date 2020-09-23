import { px } from "csx";
import { media, style } from "typestyle";

export const map = style(
  {
    flexGrow: 1,
    $nest: {
      "#show-settings": {
        display: "none",
      },
    },
  },

  media(
    { maxWidth: px(800) },
    {
      $nest: {
        "&:not(.active)": {
          display: "none",
        },

        "#show-settings": {
          display: "inherit",
        },
      },
    }
  )
);
