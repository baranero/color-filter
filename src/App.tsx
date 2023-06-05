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
  const [filteredColors, setFilteredColors] = useState<Colors[]>([]);
  const [sortedColors, setSortedColors] = useState<Colors[]>([]);

  const colorsFromLocalStorage = JSON.parse(localStorage.getItem("enteredColors")!);

  useEffect(() => {
    if (!colorsFromLocalStorage) {
      localStorage.setItem("enteredColors", JSON.stringify(defaultColors));
      setColorsArray(defaultColors);
    } else {
      setColorsArray(colorsFromLocalStorage);
    }

    if (colorsArray.length > 0) {
      const sorted = colorsArray.sort(colorsToSort);
      setSortedColors(sorted);
      localStorage.setItem("enteredColors", JSON.stringify(sorted));
    }
  }, [colorsFromLocalStorage?.length, colorsArray.length, filteredColors.length]);

  const removeColor = (id: string) => {
    const updatedColors = colorsArray.filter((item: Colors) => item.id !== id);
    setColorsArray(updatedColors);
    localStorage.setItem("enteredColors", JSON.stringify(updatedColors));
  };

  const addColorToArray = (color: Colors) => {
    const updatedColors = [...colorsArray, color];
    setColorsArray(updatedColors);
    localStorage.setItem("enteredColors", JSON.stringify(updatedColors));
  };

  return (
    <>
      <NewColor onAddColor={addColorToArray} colorsArray={colorsArray} />
      <ColorsFilter colorsArray={colorsArray} setFilteredColors={setFilteredColors} />
      <ColorsContainer
        filteredColors={filteredColors}
        sortedColors={sortedColors}
        onRemoveColor={removeColor}
      />
    </>
  );
};

export default App;
