import { style } from "typestyle";
import { flex, horizontal, height } from "csstips";
import { viewHeight } from "csx";

export const app = style(flex, horizontal, height(viewHeight(100)));