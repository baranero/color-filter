import { Colors } from "../App";

export const colorsToSort = (firstColor: Colors, secondColor: Colors) => {
  if (firstColor.rgbColor.r !== secondColor.rgbColor.r) {
    return secondColor.rgbColor.r - firstColor.rgbColor.r;
  }
  if (firstColor.rgbColor.g !== secondColor.rgbColor.g) {
    return secondColor.rgbColor.g - firstColor.rgbColor.g;
  }
  if (firstColor.rgbColor.b !== secondColor.rgbColor.b) {
    return secondColor.rgbColor.b - firstColor.rgbColor.b;
  }
  return 0;
};
