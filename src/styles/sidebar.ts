import { em, px } from "csx";
import { classes, media, style } from "typestyle";
import { NestedCSSProperties } from "typestyle/lib/types";
import { colors, measurements } from "./variables";

// SideBar
const sidebarHeaderBase: NestedCSSProperties = {
  margin: 0,
  marginTop: em(0.5),
  marginBottom: em(0.2),
  color: colors.sidebar.header.toString(),
  fontWeight: "normal",
};

export const sidebarStyle = {
  main: style(
    {
      background: colors.sidebar.background.toString(),
      borderRight: `${
        measurements.sidebar.borderSize
      } solid ${colors.sidebar.border.toString()}`,
      minWidth: measurements.sidebar.minWidth,
      maxWidth: measurements.sidebar.maxWidth,
    },
    media(
      { maxWidth: px(800) },
      {
        $nest: {
          "&:not(.active)": {
            display: "none",
          },
        },

        flexGrow: 1,
        maxWidth: "inherit",
      }
    )
  ),

  content: style({
    padding: measurements.sidebar.padding,
    overflowX: "hidden",
    overflowY: "auto",

    $nest: {
      input: {
        width: `calc(100% - 2 * ${measurements.sidebar.padding})`,
      },
    },
  }),

  mainHeader: style(sidebarHeaderBase, { fontSize: em(1.5) }),

  subHeader: style(sidebarHeaderBase, { fontSize: em(1.0) }),

  headerActions: style(
    {
      display: "none",
    },
    media(
      { maxWidth: px(800) },
      {
        display: "block",
        float: "right",
      }
    )
  ),
};

export const sidebarClasses = (active: boolean) =>
  active ? classes(sidebarStyle.main, "active") : sidebarStyle.main;
