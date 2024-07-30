import { PizzaSize } from "@/types";

const tintColorLight = "#008080";
const tintColorAccent = "#8800e7";
const tintColorDark = "#fff";

export const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

export default {
  light: {
    text: "#000",
    background: "#fff",
    tint: tintColorLight,
    accent: tintColorAccent,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
    backgroundSize: "gainsboro",
  },
  dark: {
    text: "#fff",
    background: "#000",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
    backgroundSize: "gainsboro",
  },
};
