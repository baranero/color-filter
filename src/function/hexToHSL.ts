import { hexToRgb } from "./hexToRGB";

export const hexToHSL = (hex: string) => {
  // Convert hex to RGB first.
  let r: number = 0,
    g: number = 0,
    b: number = 0;

  r = hexToRgb(hex)?.r!;
  g = hexToRgb(hex)?.g!;
  b = hexToRgb(hex)?.b!;

  r /= 255;
  g /= 255;
  b /= 255;

  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h: number,
    s: number,
    l: number = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h! /= 6;
  }
  s = s * 100;
  s = Math.round(s);
  l = l * 100;
  l = Math.round(l);
  h = Math.round(h! * 360);

  return {
    h: h,
    s: s,
    l: l,
  };
};
