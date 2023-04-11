import { Component } from "react";
import classes from "./ColorItem.module.scss";
import { Colors } from "../App";
import { ColorItemProps } from "./ColorsContainer";


// class component
class ColorItem extends Component<
  ColorItemProps,
  { colorsArrayLocalStorage: Colors[] }
> {
  constructor(props: ColorItemProps) {
    super(props);
    this.state = {
      colorsArrayLocalStorage: JSON.parse(
        localStorage.getItem("enteredColors")!
      ),
    };
  }

  colorToRemove: Colors[] = [];

  // remove color from id
  removeColor = (id: string) => {
    this.colorToRemove = this.state.colorsArrayLocalStorage.filter(
      (item: Colors) => item.id !== id
    );
    localStorage.setItem("enteredColors", JSON.stringify(this.colorToRemove));
    this.props.onRemoveColor(this.props.id);
  };

  render() {
    return (
      <>
        <div className={classes["color-item"]}>
          {this.props.addedByUser && (
            <button
              value={this.props.id}
              onClick={(event) => this.removeColor(this.props.id)}
              className={classes["color-item-button"]}
            >
              X
            </button>
          )}
        </div>
        <p className={classes["color-name"]}>
          {this.props.hexColor}
        </p>
      </>
    );
  }
}

export default ColorItem;
