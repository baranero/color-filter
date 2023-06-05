import React, { SetStateAction, useEffect, useState } from "react";
import { Colors } from "../../App";
import classes from "./ColorsFilter.module.scss";
import { colorsToSort } from "../../function/colorsToSort";

interface ColorsFilterProps {
  setFilteredColors: React.Dispatch<SetStateAction<Colors[]>>;
  colorsArray: Colors[];
}

const ColorsFilter: React.FC<ColorsFilterProps> = ({
  setFilteredColors,
  colorsArray,
}) => {
  const [redColorFilter, setRedColorFilter] = useState<boolean>(false);
  const [greenColorFilter, setGreenColorFilter] = useState<boolean>(false);
  const [blueColorFilter, setBlueColorFilter] = useState<boolean>(false);
  const [saturationFilter, setSaturationFilter] = useState<boolean>(false);

  useEffect(() => {
    const filteredColors = [...colorsArray].sort(colorsToSort).filter((item: Colors) => {
      if (redColorFilter && item.rgbColor.r <= 127) {
        return false;
      }

      if (greenColorFilter && item.rgbColor.g <= 127) {
        return false;
      }

      if (blueColorFilter && item.rgbColor.b <= 127) {
        return false;
      }

      if (saturationFilter && item.hslColor.s <= 50) {
        return false;
      }

      return true;
    });

    setFilteredColors(filteredColors);
  }, [setFilteredColors, colorsArray, redColorFilter, greenColorFilter, blueColorFilter, saturationFilter]);

  const handleColorFilterChange = (filter: string) => {
    switch (filter) {
      case "red":
        setRedColorFilter(!redColorFilter);
        break;
      case "green":
        setGreenColorFilter(!greenColorFilter);
        break;
      case "blue":
        setBlueColorFilter(!blueColorFilter);
        break;
      case "saturation":
        setSaturationFilter(!saturationFilter);
        break;
      default:
        break;
    }
  };

  return (
    <div className={classes["colors-filter-container"]}>
      <div className={classes["colors-filter-item"]}>
        <input
          type="checkbox"
          onChange={() => handleColorFilterChange("red")}
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
          onChange={() => handleColorFilterChange("green")}
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
          onChange={() => handleColorFilterChange("blue")}
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
          onChange={() => handleColorFilterChange("saturation")}
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
