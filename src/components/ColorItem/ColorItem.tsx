import { Component } from "react";
import classes from "./ColorItem.module.scss";
import { Colors } from "../../App";
import { ColorItemProps } from "../ColorsContainer/ColorsContainer";

class ColorItem extends Component<ColorItemProps, { colorsArrayLocalStorage: Colors[] }> {
  colorToRemove: Colors[] = [];

  constructor(props: ColorItemProps) {
    super(props);
    this.state = {
      colorsArrayLocalStorage: JSON.parse(localStorage.getItem("enteredColors")!),
    };
  }

  removeColor = (id: string) => {
    this.colorToRemove = this.state.colorsArrayLocalStorage.filter((item: Colors) => item.id !== id);
    localStorage.setItem("enteredColors", JSON.stringify(this.colorToRemove));
    this.props.onRemoveColor(this.props.id);
  };

  render() {
    const { addedByUser, id, hexColor } = this.props;

    return (
      <>
        <div className={classes["color-item"]}>
          {addedByUser && (
            <button
              value={id}
              onClick={(event) => this.removeColor(id)}
              className={classes["color-item-button"]}
            >
              X
            </button>
          )}
        </div>
        <p className={classes["color-name"]}>{hexColor}</p>
      </>
    );
  }
}

export default ColorItem;
