import React, { useEffect, useState } from 'react';
import { defaultColors } from '../data/defaultColors';
import classes from './ColorsContainer.module.scss'
import { Colors, RemoveColorProps } from '../App';
import ColorItem from './ColorItem';

export type ColorItemProps = Colors & RemoveColorProps

const ColorsContainer: React.FC<RemoveColorProps> = (props) => {

let colorsArrayLocalStorage = (JSON.parse(localStorage.getItem('enteredColors')!))

useEffect(() => {
  JSON.parse(localStorage.getItem('enteredColors')!)
  
}, [colorsArrayLocalStorage])

const removeColorFromArray = (color: string) => {
  // localStorage.setItem('enteredColors', JSON.stringify(color))
  // console.log(JSON.parse(localStorage.getItem('enteredColors')!));
  console.log(color);
  
  props.onRemoveColor(color)
}

return (
  <div className={classes['colors']}>
    {colorsArrayLocalStorage && colorsArrayLocalStorage.map((item: ColorItemProps) => {
      return (
        <div key={item.id} className={classes['colors-container']}>
          <ColorItem id={item.id} hexColor={item.hexColor} rgbColor={item.rgbColor} addedByUser={item.addedByUser} onRemoveColor={removeColorFromArray}/>
        </div>
      )
    })}
  </div>
)
}

export default ColorsContainer