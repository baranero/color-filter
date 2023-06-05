import { useEffect } from "react";
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

const ColorsContainer: React.FC<ColorsContainerProps> = ({
  sortedColors,
  onRemoveColor,
  filteredColors,
}) => {
  const colorsFromLocalStorage = JSON.parse(localStorage.getItem("enteredColors")!);

  useEffect(() => {
    document.documentElement.style.setProperty("--number-of-child", String(colorsFromLocalStorage?.length + 3));

    if (colorsFromLocalStorage !== null) {
      const colorsToSet = filteredColors.length > 0 ? filteredColors : sortedColors;

      colorsToSet.forEach((item: Colors, index: number) => {
        document.documentElement.style.setProperty(
          `--color-user-${index + 1}`,
          item.hexColor
        );
      });
    }
  }, [filteredColors, sortedColors, colorsFromLocalStorage]);

  const removeColorFromArray = (color: string) => {
    onRemoveColor(color);
  };

  const redCheckbox = document.getElementById("red") as HTMLInputElement;
  const greenCheckbox = document.getElementById("green") as HTMLInputElement;
  const blueCheckbox = document.getElementById("blue") as HTMLInputElement;
  const saturationCheckbox = document.getElementById("saturation") as HTMLInputElement;

  const isAnyCheckboxChecked =
    filteredColors.length > 0 ||
    redCheckbox?.checked ||
    greenCheckbox?.checked ||
    blueCheckbox?.checked ||
    saturationCheckbox?.checked;

  return (
    <div className={classes.colors}>
      {isAnyCheckboxChecked
        ? filteredColors.map((item: Colors) => (
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
          ))
        : sortedColors.map((item: Colors) => (
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
          ))}
    </div>
  );
};

export default ColorsContainer;
