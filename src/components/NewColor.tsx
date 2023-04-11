import React, { useState } from "react";
import classes from "./NewColor.module.scss";
import { Colors } from "../App";
import { hexToRgb } from "../function/hexToRGB";
import { hexToHSL } from "../function/hexToHSL";

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

  const invalidCharacters = /[^a-fA-F0-9#]/g;
  const validCharacters = /[a-fA-F0-9]/g;
  console.log();
  

  // check if "#" sign is on 1 index or further
  const correctFirstCharacter: boolean =
    enteredColor.hexColor.includes("#", 0) ||
    enteredColor.hexColor.includes("", 0);

  // color input form
  const colorChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {

    // use values from autocomplete
    if (event.target.value.length >= 7) {
      setEnteredColor({
        id: Math.random().toString(16).slice(2),
        hexColor: event.target.value.toUpperCase(),
        rgbColor: hexToRgb(event.target.value)!,
        hslColor: hexToHSL(event.target.value),
        addedByUser: true,
      });
    }

    //  remove invalid character
    else if (event.target.value.match(invalidCharacters)) {
      setEnteredColor({
        id: Math.random().toString(16).slice(2),
        hexColor: event.target.value.replace(invalidCharacters, ""),
        rgbColor: hexToRgb(event.target.value)!,
        hslColor: hexToHSL(event.target.value),
        addedByUser: true,
      });

      // remove "#" except the first one
    }  else if (
      event.target.value.match(validCharacters) &&
      enteredColor.hexColor.length < 1
    ) {
      setEnteredColor({
        id: Math.random().toString(16).slice(2),
        hexColor: event.target.value.replace(validCharacters, "").toUpperCase(),
        rgbColor: hexToRgb(event.target.value)!,
        hslColor: hexToHSL(event.target.value),
        addedByUser: true,
      });

      // set value and remove "#" in the middle of value
    } else if (correctFirstCharacter && enteredColor.hexColor.length) {
      setEnteredColor({
        id: Math.random().toString(16).slice(2),
        hexColor: event.target.value.replace(/([^])(#)/g, "$1").toUpperCase(),
        rgbColor: hexToRgb(event.target.value)!,
        hslColor: hexToHSL(event.target.value),
        addedByUser: true,
      });

      // don't let to type valid character on first place
    } else {
      setEnteredColor({
        id: Math.random().toString(16).slice(2),
        hexColor: event.target.value.replace(/([^#])(#)/g, "$1").toUpperCase(),
        rgbColor: hexToRgb(event.target.value)!,
        hslColor: hexToHSL(event.target.value),
        addedByUser: true,
      });
    }
  };
console.log(enteredColor);

  const submitHandler = (event: React.FormEvent): void => {
    if (enteredColor.hexColor.length < 7) {
      return
    }
    if (colorsArray.filter((item) => item.hexColor === enteredColor.hexColor).length) {
      return
    } 
    event.preventDefault();
    onAddColor(enteredColor);
    setEnteredColor(defaultValues);
  };

  return (
    <form onSubmit={submitHandler} className={classes["color-form"]}>
      <label htmlFor="color" className={classes["color-form-label"]}>
        Color:
      </label>
      <input
        className={
          classes[
            invalidCharacters
              ? "color-form-input"
              : "color-form-input-wrong"
          ]
        }
        id="color"
        type="text"
        value={enteredColor.hexColor}
        onChange={colorChangeHandler}
        placeholder="Input color in HEX format (eg. #3F3F3F)"
        maxLength={7}
      />
      {invalidCharacters ? (
        ""
      ) : (
        <p className={classes["color-form-warning"]}>
          You can use # sign only as first
        </p>
      )}
      <button className={classes["color-form-button"]} type="submit">
        Submit
      </button>
    </form>
  );
};

export default NewColor;
