import { flex, height, horizontal } from "csstips";
import { viewHeight } from "csx";
import { style } from "typestyle";

export const app = style(flex, horizontal, height(viewHeight(100)));
