import { SetStateAction, useEffect } from "react";
import { Colors } from "../App";
import classes from "./ColorsFilter.module.scss";

interface ColorsFilterProps {
  filteredColors: Colors[];
  setFilteredColors: React.Dispatch<SetStateAction<Colors[]>>;
  colorsArray: Colors[];
}

const ColorsFilter = ({
  filteredColors,
  setFilteredColors,
  colorsArray,
}: ColorsFilterProps) => {
  const colorFilter = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const redCheckbox = document.getElementById(
      "red"
    ) as HTMLInputElement | null;
    const greenCheckbox = document.getElementById(
      "green"
    ) as HTMLInputElement | null;
    const blueCheckbox = document.getElementById(
      "blue"
    ) as HTMLInputElement | null;
    const saturationCheckbox = document.getElementById(
      "saturation"
    ) as HTMLInputElement | null;

    // all checkboxes
    if (
      redCheckbox?.checked &&
      greenCheckbox?.checked &&
      blueCheckbox?.checked &&
      saturationCheckbox?.checked
    ) {
      setFilteredColors(
        colorsArray.filter(
          (colors: any) =>
            colors.rgbColor.r > 127 &&
            colors.rgbColor.g > 127 &&
            colors.rgbColor.b > 127 &&
            colors.hslColor.s > 50
        )
      );

      // 2, 3, 4 checkboxes
    } else if (
      greenCheckbox?.checked &&
      blueCheckbox?.checked &&
      saturationCheckbox?.checked
    ) {
      setFilteredColors(
        colorsArray.filter(
          (colors: any) =>
            colors.rgbColor.g > 127 &&
            colors.rgbColor.b > 127 &&
            colors.hslColor.s > 50
        )
      );

      // 1, 2, 3 checkboxes
    } else if (
      redCheckbox?.checked &&
      greenCheckbox?.checked &&
      blueCheckbox?.checked
    ) {
      setFilteredColors(
        colorsArray.filter(
          (colors: any) =>
            colors.rgbColor.r > 127 &&
            colors.rgbColor.g > 127 &&
            colors.rgbColor.b > 127
        )
      );

      // 1, 2, 4 checkboxes
    } else if (
      redCheckbox?.checked &&
      greenCheckbox?.checked &&
      saturationCheckbox?.checked
    ) {
      setFilteredColors(
        colorsArray.filter(
          (colors: any) =>
            colors.rgbColor.r > 127 &&
            colors.rgbColor.g > 127 &&
            colors.hslColor.s > 50
        )
      );

      // 1, 3, 4 checkboxes
    } else if (
      redCheckbox?.checked &&
      blueCheckbox?.checked &&
      saturationCheckbox?.checked
    ) {
      setFilteredColors(
        colorsArray.filter(
          (colors: any) =>
            colors.rgbColor.r > 127 &&
            colors.rgbColor.b > 127 &&
            colors.hslColor.s > 50
        )
      );

      // 1, 2 checkboxes
    } else if (redCheckbox?.checked && greenCheckbox?.checked) {
      setFilteredColors(
        colorsArray.filter(
          (colors: any) => colors.rgbColor.r > 127 && colors.rgbColor.g > 127
        )
      );

      // 1, 3 checkboxes
    } else if (redCheckbox?.checked && blueCheckbox?.checked) {
      setFilteredColors(
        colorsArray.filter(
          (colors: any) => colors.rgbColor.r > 127 && colors.rgbColor.b > 127
        )
      );

      // 1, 4 checkboxes
    } else if (redCheckbox?.checked && saturationCheckbox?.checked) {
      setFilteredColors(
        colorsArray.filter(
          (colors: any) => colors.rgbColor.r > 127 && colors.hslColor.s > 50
        )
      );

      // 2, 3 checkboxes
    } else if (greenCheckbox?.checked && blueCheckbox?.checked) {
      setFilteredColors(
        colorsArray.filter(
          (colors: any) => colors.rgbColor.g > 127 && colors.rgbColor.b > 127
        )
      );

      // 2, 4 checkboxes
    } else if (greenCheckbox?.checked && saturationCheckbox?.checked) {
      setFilteredColors(
        colorsArray.filter(
          (colors: any) => colors.rgbColor.g > 127 && colors.hslColor.s > 50
        )
      );

      // 3, 4 checkboxes
    } else if (blueCheckbox?.checked && saturationCheckbox?.checked) {
      setFilteredColors(
        colorsArray.filter(
          (colors: any) => colors.rgbColor.b > 127 && colors.hslColor.s > 50
        )
      );

      // 1 checkbox
    } else if (redCheckbox?.checked) {
      setFilteredColors(
        colorsArray.filter((colors: any) => colors.rgbColor.r > 127)
      );

      // 2 checkbox
    } else if (greenCheckbox?.checked) {
      setFilteredColors(
        colorsArray.filter((colors: any) => colors.rgbColor.g > 127)
      );

      // 3 checkbox
    } else if (blueCheckbox?.checked) {
      setFilteredColors(
        colorsArray.filter((colors: any) => colors.rgbColor.b > 127)
      );

      // 4 checkbox
    } else if (saturationCheckbox?.checked) {
      setFilteredColors(
        colorsArray.filter((colors: any) => colors.hslColor.s > 50)
      );

      // checked: false
    } else {
      setFilteredColors([]);
    }
  };

  return (
    <div className={classes["colors-filter-container"]}>
      <div className={classes["colors-filter-item"]}>
        <input
          type="checkbox"
          onChange={colorFilter}
          value="red"
          name="red"
          id="red"
        />
        <label htmlFor="red">Red &gt; 50%</label>
      </div>
      <div className={classes["colors-filter-item"]}>
        <input
          type="checkbox"
          onChange={colorFilter}
          value="green"
          name="green"
          id="green"
        />
        <label htmlFor="green">Green &gt; 50%</label>
      </div>
      <div className={classes["colors-filter-item"]}>
        <input
          type="checkbox"
          onChange={colorFilter}
          value="blue"
          name="blue"
          id="blue"
        />
        <label htmlFor="blue">Blue &gt; 50%</label>
      </div>
      <div className={classes["colors-filter-item"]}>
        <input
          type="checkbox"
          onChange={colorFilter}
          value="saturation"
          name="saturation"
          id="saturation"
        />
        <label htmlFor="saturation">Saturation &gt; 50%</label>
      </div>
    </div>
  );
};

export default ColorsFilter;
