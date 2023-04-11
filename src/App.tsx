import React, { useEffect, useState } from "react";
import NewColor from "./components/NewColor/NewColor";
import ColorsContainer from "./components/ColorsContainer/ColorsContainer";
import { defaultColors } from "./data/defaultColors";
import ColorsFilter from "./components/ColorsFilter/ColorsFilter";
import { colorsToSort } from "./function/colorsToSort";

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

  let colorsFromLocalStorage = JSON.parse(
    localStorage.getItem("enteredColors")!
  );

  // set items in local storage
  useEffect(() => {
    if (!colorsFromLocalStorage) {
      localStorage.setItem("enteredColors", JSON.stringify(defaultColors)); // if local storage is empty set default colors
      setColorsArray(defaultColors);
    } else {
      setColorsArray(colorsFromLocalStorage); // if not empty set colors from local storage
    }
    if (colorsArray?.length > 0) {
      setSortedColors(colorsArray?.sort(colorsToSort));
      localStorage.setItem("enteredColors", JSON.stringify(colorsArray));
    }
  }, [
    colorsFromLocalStorage?.length,
    colorsArray.length,
    filteredColors.length,
  ]);

  // remove color added by user
  const removeColor = (id: string) => {
    // remove color from array
    let colorToRemove = colorsArray.filter((item) => item.id !== id);
    setColorsArray(colorToRemove);
    localStorage.setItem("enteredColors", JSON.stringify(colorToRemove));
  };

  const addColorToArray = (color: Colors) => {
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
      <NewColor onAddColor={addColorToArray} colorsArray={colorsArray} />
      <ColorsFilter
        colorsArray={colorsArray}
        setFilteredColors={setFilterdColors}
      />
      <ColorsContainer
        filteredColors={filteredColors}
        sortedColors={sortedColors}
        onRemoveColor={removeColor}
      />
    </>
  );
};

export default App;
