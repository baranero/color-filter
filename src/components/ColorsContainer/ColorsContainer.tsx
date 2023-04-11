import React, { SetStateAction, useEffect } from "react";
import classes from "./ColorsContainer.module.scss";
import { Colors } from "../../App";
import ColorItem from "../ColorItem/ColorItem";

export type ColorItemProps = Colors & {
  onRemoveColor: (id: string) => void;
};

interface ColorsContainerProps {
  sortedColors: Colors[];
  filteredColors: Colors[];
  onRemoveColor: (id: string) => void;
}

const ColorsContainer = ({
  sortedColors,
  onRemoveColor,
  filteredColors,
}: ColorsContainerProps) => {
  let colorsFromLocalStorage = JSON.parse(
    localStorage.getItem("enteredColors")!
  );
  // set background colors
  useEffect(() => {
    document.documentElement.style.setProperty(
      // number of colors items based on colors in local storage
      `--number-of-child`,
      colorsFromLocalStorage?.length + 3
    );
    if (colorsFromLocalStorage !== null) {
      if (filteredColors.length > 0) {
        for (let i = 0; i < filteredColors?.length; i++) {
          // set colors if any filter is checked
          document.documentElement.style.setProperty(
            `--color-user-${i + 1}`,
            filteredColors[i].hexColor
          );
        }
      } else {
        for (let i = 0; i < sortedColors?.length; i++) {
          // set colors for whole array
          document.documentElement.style.setProperty(
            `--color-user-${i + 1}`,
            sortedColors[i].hexColor
          );
        }
      }
    }
  }, [filteredColors, sortedColors?.length, colorsFromLocalStorage]);

  //pass remove function through components
  const removeColorFromArray = (color: string) => {
    onRemoveColor(color);
  };

  // check if inputs are checked
  const redCheckbox = document.getElementById("red") as HTMLInputElement | null;
  const greenCheckbox = document.getElementById(
    "green"
  ) as HTMLInputElement | null;
  const blueCheckbox = document.getElementById(
    "blue"
  ) as HTMLInputElement | null;
  const saturationCheckbox = document.getElementById(
    "saturation"
  ) as HTMLInputElement | null;

  // if checkbox is checked display filtered colors

  if (
    filteredColors.length > 0 ||
    redCheckbox?.checked ||
    greenCheckbox?.checked ||
    blueCheckbox?.checked ||
    saturationCheckbox?.checked
  ) {
    return (
      <div className={classes["colors"]}>
        {filteredColors &&
          filteredColors?.map((item: Colors) => {
            return (
              <div key={item.id} className={classes["colors-container"]}>
                <ColorItem
                  id={item.id}
                  hexColor={item.hexColor}
                  rgbColor={item.rgbColor}
                  hslColor={item.hslColor}
                  addedByUser={item.addedByUser}
                  onRemoveColor={removeColorFromArray}
                />
              </div>
            );
          })}
      </div>
    );
    // if checkbox is not checked display all colors
  } else {
    return (
      <div className={classes["colors"]}>
        {sortedColors &&
          sortedColors?.map((item: Colors) => {
            return (
              <div key={item.id} className={classes["colors-container"]}>
                <ColorItem
                  id={item.id}
                  hexColor={item.hexColor}
                  rgbColor={item.rgbColor}
                  hslColor={item.hslColor}
                  addedByUser={item.addedByUser}
                  onRemoveColor={removeColorFromArray}
                />
              </div>
            );
          })}
      </div>
    );
  }
};

export default ColorsContainer;
