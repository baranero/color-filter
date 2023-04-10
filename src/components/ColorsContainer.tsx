import React, { SetStateAction, useEffect } from 'react';
import classes from './ColorsContainer.module.scss'
import { Colors } from '../App';
import ColorItem from './ColorItem';

export type ColorItemProps = Colors & {
  onRemoveColor: (id: string) => void
}

interface ColorsContainerProps {
  sortedColors: Colors[];
  setSortedColors: React.Dispatch<SetStateAction<Colors[]>>;
  filteredColors: Colors[];
  onRemoveColor: (id: string) => void
}

const ColorsContainer = ({ sortedColors, onRemoveColor, filteredColors }: ColorsContainerProps) => {

// let colorsFromLocalStorage = JSON.parse(localStorage.getItem('enteredColors')!)

const removeColorFromArray = (color: string) => {  
  onRemoveColor(color)
}

console.log(filteredColors);
const redCheckbox = document.getElementById("red") as HTMLInputElement | null
console.log(redCheckbox?.checked);


if (filteredColors.length > 0 || redCheckbox?.checked) {
  return (
    <div className={classes['colors']}>

{filteredColors && filteredColors?.map((item: Colors) => {
      return (
        <div key={item.id} className={classes['colors-container']}>
          <ColorItem id={item.id} hexColor={item.hexColor} rgbColor={item.rgbColor} hslColor={item.hslColor} addedByUser={item.addedByUser} onRemoveColor={removeColorFromArray}/>
        </div>
      )
    })}
  </div>
  )
}  else {
  return (
    <div className={classes['colors']}>
  
  {sortedColors && sortedColors?.map((item: Colors) => {
        return (
          <div key={item.id} className={classes['colors-container']}>
            <ColorItem id={item.id} hexColor={item.hexColor} rgbColor={item.rgbColor} hslColor={item.hslColor} addedByUser={item.addedByUser} onRemoveColor={removeColorFromArray}/>
          </div>
        )
      })}
    </div>
  )
}

}

export default ColorsContainer