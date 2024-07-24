const tintColorLight = "#008080";
const tintColorAccent = "#d44242";
const tintColorDark = "#fff";

export const sizes = ["S", "M", "L", "XL"];

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
