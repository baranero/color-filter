import React, { useEffect, useState } from "react";
import NewColor from "./components/NewColor";
import ColorsContainer, { ColorItemProps } from "./components/ColorsContainer";
import { defaultColors } from "./data/defaultColors";
import ColorsFilter from "./components/ColorsFilter";

export interface Colors {
  id: string;
  hexColor: string;
  rgbColor: { r: number; g: number; b: number };
  hslColor: { h: number; s: number; l: number };
  addedByUser: boolean;
}

const App: React.FC = () => {
  const [colorsArray, setColorsArray] = useState<Colors[]>([]);
  const [filteredColors, setFilterdColors] = useState<Colors[]>([]);
  const [sortedColors, setSortedColors] = useState<Colors[]>([]);

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
  }, [filteredColors, sortedColors, colorsFromLocalStorage]);

  // set items in local storage
  useEffect(() => {
    if (!colorsFromLocalStorage) {
      localStorage.setItem("enteredColors", JSON.stringify(defaultColors)); // if local storage is empty set default colors
      setColorsArray(defaultColors);
    } else {
      setColorsArray(colorsFromLocalStorage); // if not empty set colors from local storage
    }

    // sort colors from colorsArray
    const colorsToSort = colorsArray?.sort( 
      (firstColor: Colors, secondColor: Colors) => {
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
      }
    );

    // if colorsArray exists set colorsToSort as sortedColors 
    if (colorsArray.length > 0) {
      setSortedColors(colorsToSort);
      localStorage.setItem("enteredColors", JSON.stringify(colorsToSort)); // set sorted colors in local storage
    }
  }, [colorsFromLocalStorage.length, sortedColors.length, colorsArray.length]);

  // remove color added by user
  const removeColor = (id: string) => {

    // remove color while checkbox is checked
    let filteredColorToRemove = filteredColors.filter((item) => item.id !== id);
    if (
      filteredColors.length > 0 ||
      redCheckbox?.checked ||
      greenCheckbox?.checked ||
      blueCheckbox?.checked ||
      saturationCheckbox?.checked
    ) {
      setFilterdColors(filteredColorToRemove);
    }

    // remove color from array
    let colorToRemove = colorsArray.filter((item) => item.id !== id);
    setColorsArray(colorToRemove);
    localStorage.setItem("enteredColors", JSON.stringify(colorToRemove));
  };

  const addColorToArray = (color: Colors) => {

    // add color while checkbox is checked
    if (
      filteredColors.length > 0 ||
      redCheckbox?.checked ||
      greenCheckbox?.checked ||
      blueCheckbox?.checked ||
      saturationCheckbox?.checked
    ) {
      setFilterdColors([...filteredColors, color]);
    }

    // add color to array
    setColorsArray([...colorsArray, color]);
    localStorage.setItem(
      "enteredColors",
      JSON.stringify([...colorsArray, color])
    );
    return;
  };

  return (
    <>
      <NewColor onAddColor={addColorToArray} />
      <ColorsFilter
        colorsArray={colorsArray}
        filteredColors={filteredColors}
        setFilteredColors={setFilterdColors}
      />
      <ColorsContainer
        filteredColors={filteredColors}
        sortedColors={sortedColors}
        setSortedColors={setSortedColors}
        onRemoveColor={removeColor}
      />
    </>
  );
};

export default App;
