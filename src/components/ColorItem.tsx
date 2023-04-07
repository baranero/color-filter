import React, { Component } from "react";
import classes from './ColorsContainer.module.scss'
import { Colors } from "../App";
import { ColorItemProps } from "./ColorsContainer";

class ColorItem extends Component<ColorItemProps, {colorsArrayLocalStorage: Colors[]}> {

  constructor(props: ColorItemProps) {
    super(props);
    this.state = {
      colorsArrayLocalStorage: JSON.parse(localStorage.getItem('enteredColors')!)
    };
  }

  colorToRemove: Colors[] = []

  removeColor = (id: string ) => {
    this.colorToRemove = this.state.colorsArrayLocalStorage.filter((item: Colors) => item.id !== id)
    localStorage.setItem('enteredColors', JSON.stringify(this.colorToRemove))
    this.props.onRemoveColor(this.props.id)
  }

  render() {
    return (
          <div
           className={classes['colors-container-item']} >
            {this.props.addedByUser && <button value={this.props.id} onClick={(event) => this.removeColor(this.props.id)
            } className={classes['colors-container-item-button']}>X</button>}
            <p className={classes['colors-container-item-name']}>{this.props.hexColor}</p>
          </div>
    )
  }
}

export default ColorItem