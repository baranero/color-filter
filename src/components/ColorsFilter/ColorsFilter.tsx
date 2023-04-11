import { SetStateAction, useEffect, useState } from "react";
import { Colors } from "../../App";
import classes from "./ColorsFilter.module.scss";
import { defaultColors } from "../../data/defaultColors";
import { colorsToSort } from "../../function/colorsToSort";

interface ColorsFilterProps {
  setFilteredColors: React.Dispatch<SetStateAction<Colors[]>>;
  colorsArray: Colors[];
}

const ColorsFilter = ({
  setFilteredColors,
  colorsArray,
}: ColorsFilterProps) => {

  // inputs check states
  const [redColorFilter, setRedColorFilter] = useState<boolean>(false);
  const [greenColorFilter, setGreenColorFilter] = useState<boolean>(false);
  const [blueColorFilter, setBlueColorFilter] = useState<boolean>(false);
  const [saturationFilter, setSaturationFilter] = useState<boolean>(false);

  // array with filtered colors
  useEffect(() => {
    setFilteredColors(

      // sort and filter colorsArray
      [...colorsArray].sort(colorsToSort).filter((item: Colors) => {

        // check if red input is checked and red in RGB is less or equal to 127
        if (redColorFilter && item.rgbColor.r <= 127) {
          return false;
        }

         // check if green input is checked and green in RGB is less or equal to 127
        if (greenColorFilter && item.rgbColor.g <= 127) {
          return false;
        }

         // check if blue input is checked and blue in RGB is less or equal to 127
        if (blueColorFilter && item.rgbColor.b <= 127) {
          return false;
        }

         // check if saturation input is checked and saturation in HSL is less or equal to 127
        if (saturationFilter && item.hslColor.s <= 50) {
          return false;
        }

        return true;
      })
    );
  }, [
    setFilteredColors,
    colorsArray?.length,
    redColorFilter,
    greenColorFilter,
    blueColorFilter,
    saturationFilter,
  ]);

  return (
    <div className={classes["colors-filter-container"]}>
      <div className={classes["colors-filter-item"]}>
        <input
          type="checkbox"
          onChange={() => setRedColorFilter(!redColorFilter)}
          checked={redColorFilter}
          value="red"
          name="red"
          id="red"
          className={classes["colors-filter-input"]}
        />
        <label htmlFor="red">Red &gt; 50%</label>
      </div>
      <div className={classes["colors-filter-item"]}>
        <input
          type="checkbox"
          onChange={() => setGreenColorFilter(!greenColorFilter)}
          checked={greenColorFilter}
          value="green"
          name="green"
          id="green"
          className={classes["colors-filter-input"]}
        />
        <label htmlFor="green">Green &gt; 50%</label>
      </div>
      <div className={classes["colors-filter-item"]}>
        <input
          type="checkbox"
          onChange={() => setBlueColorFilter(!blueColorFilter)}
          checked={blueColorFilter}
          value="blue"
          name="blue"
          id="blue"
          className={classes["colors-filter-input"]}
        />
        <label htmlFor="blue">Blue &gt; 50%</label>
      </div>
      <div className={classes["colors-filter-item"]}>
        <input
          type="checkbox"
          onChange={() => setSaturationFilter(!saturationFilter)}
          checked={saturationFilter}
          value="saturation"
          name="saturation"
          id="saturation"
          className={classes["colors-filter-input"]}
        />
        <label htmlFor="saturation">Saturation &gt; 50%</label>
      </div>
    </div>
  );
};

export default ColorsFilter;
