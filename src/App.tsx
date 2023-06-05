import React, { useEffect, useState } from "react";
import NewColor from "./components/NewColor/NewColor";
import ColorsContainer from "./components/ColorsContainer/ColorsContainer";
import { defaultColors } from "./data/defaultColors";
import ColorsFilter from "./components/ColorsFilter/ColorsFilter";
import { colorsToSort } from "./function/colorsToSort";

export interface Color {
  id: string;
  hexColor: string;
  rgbColor: { r: number; g: number; b: number };
  hslColor: { h: number; s: number; l: number };
  addedByUser: boolean;
}

const App: React.FC = () => {
  const [colors, setColors] = useState<Color[]>([]);
  const [filteredColors, setFilteredColors] = useState<Color[]>([]);

  useEffect(() => {
    const colorsFromLocalStorage = JSON.parse(
      localStorage.getItem("enteredColors") || "[]"
    ) as Color[];

    if (colorsFromLocalStorage.length === 0) {
      localStorage.setItem("enteredColors", JSON.stringify(defaultColors));
      setColors(defaultColors);
    } else {
      setColors(colorsFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    const sortedColors = [...colors].sort(colorsToSort);
    setFilteredColors(sortedColors);
    localStorage.setItem("enteredColors", JSON.stringify(sortedColors));
  }, [colors]);

  const removeColor = (id: string) => {
    const updatedColors = colors.filter((color) => color.id !== id);
    setColors(updatedColors);
  };

  const addColor = (newColor: Color) => {
    setColors((prevColors) => [...prevColors, newColor]);
  };

  return (
    <>
      <NewColor onAddColor={addColor} colors={colors} />
      <ColorsFilter colors={colors} setFilteredColors={setFilteredColors} />
      <ColorsContainer
        filteredColors={filteredColors}
        onRemoveColor={removeColor}
      />
    </>
  );
};

export default App;
