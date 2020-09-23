import { color, px } from "csx";

// Values
export const measurements = {
  field: {
    borderRadius: px(4),
    borderSize: px(1),
    size: px(32),
    padding: `0 ${px(7)}`,
  },

  sidebar: {
    minWidth: px(200),
    maxWidth: px(350),
    padding: px(8),
    borderSize: px(1),
  },
};

export const colors = {
  background: color("#fff"),
  text: color("#000"),
  primary: color("#693"),
  primaryHover: color("#693").lighten(0.2),

  field: {
    border: color("#999"),
  },

  sidebar: {
    background: color("#ddffdd"),
    border: color("#006600"),
    header: color("#666"),
  },

  error: {
    text: color("#600"),
  },
};
