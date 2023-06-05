import React, { useState } from "react";
import classes from "./NewColor.module.scss";
import { Colors } from "../../App";
import { hexToRgb } from "../../function/hexToRGB";
import { hexToHSL } from "../../function/hexToHSL";

interface NewColorProps {
  onAddColor: (enteredColor: Colors) => void;
  colorsArray: Colors[];
}

const NewColor: React.FC<NewColorProps> = ({ onAddColor, colorsArray }) => {
  const defaultValues = {
    id: "",
    hexColor: "",
    rgbColor: { r: null!, g: null!, b: null! },
    hslColor: { h: null!, s: null!, l: null! },
    addedByUser: true,
  };

  const [enteredColor, setEnteredColor] = useState<Colors>(defaultValues);
  const [error, setError] = useState<boolean>(false);

  const colorChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
  
    if (value.length > 7) {
      return;
    }
  
    const validCharacters = /^[A-Fa-f0-9]*$/;
  
    if (value.length === 0 || (value.length === 1 && value === "#")) {
      setError(false);
    } else if (value.length === 1 && value !== "#") {
      setError(true);
      return;
    } else if (value.length > 1 && value.length < 7) {
      if (!validCharacters.test(value.slice(1))) {
        return;
      }
      setError(false);
    } else if (value.length === 7) {
      if (!validCharacters.test(value.slice(1))) {
        return;
      }
      setError(false);
    } else {
      setError(true);
      return;
    }
  
    setEnteredColor({
      id: Math.random().toString(16).slice(2),
      hexColor: value.toUpperCase().slice(0, 7),
      rgbColor: hexToRgb(value)!,
      hslColor: hexToHSL(value),
      addedByUser: true,
    });
  };

  const submitHandler = (event: React.FormEvent): void => {
    event.preventDefault();
  
    if (enteredColor.hexColor.length < 3) {
      alert("Too short! Type at least 3 characters.");
      setError(true);
      return;
    }
  
    let hexValue = enteredColor.hexColor.toUpperCase();
  
    // Check if the entered hex color code is a 3-digit code
    if (hexValue.length === 4 && hexValue[0] === "#") {
      const r = hexValue[1];
      const g = hexValue[2];
      const b = hexValue[3];
  
      // Convert the 3-digit code to a 6-digit code
      hexValue = `#${r}${r}${g}${g}${b}${b}`;
    }
  
    // Check if the hex color code is valid
    if (!/^#[A-Fa-f0-9]{6}$/.test(hexValue)) {
      alert("Invalid color format!");
      setError(true);
      return;
    }
  
    // Check if the color already exists
    if (colorsArray.some((item) => item.hexColor === hexValue)) {
      alert("Color already exists!");
      return;
    }
  
    onAddColor({
      id: Math.random().toString(16).slice(2),
      hexColor: hexValue,
      rgbColor: hexToRgb(hexValue)!,
      hslColor: hexToHSL(hexValue),
      addedByUser: true,
    });
  
    setEnteredColor(defaultValues);
    setError(false);
  };

  return (
    <form onSubmit={submitHandler} className={classes["color-form"]}>
      <label htmlFor="color" className={classes["color-form-label"]}>
        Color:
      </label>
      <input
        className={
          classes[error ? "color-form-input-wrong" : "color-form-input"]
        }
        id="color"
        type="text"
        value={enteredColor.hexColor}
        onChange={colorChangeHandler}
        placeholder="Input color in HEX format (eg. #3F3F3F)"
        maxLength={7}
      />
      {error && (
        <p className={classes["color-form-warning"]}>Invalid value!</p>
      )}
      <button
        className={classes["color-form-button"]}
        type="submit"
      >
        Add Color
      </button>
    </form>
  );
};

export default NewColor;
