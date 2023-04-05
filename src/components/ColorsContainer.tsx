import React, { useEffect, useState } from 'react';
import { defaultColors } from '../data/defaultColors';
import classes from './ColorsContainer.module.scss'
import { Colors } from '../App';

interface RemoveColorProps {
  onRemoveColor: (id: string) => void;
}

const ColorsContainer: React.FC<RemoveColorProps> = ({ onRemoveColor }) => {

  const colorsArrayLocalStorage = (JSON.parse(localStorage.getItem('enteredColors')!))
  
  useEffect(() => {

    const timer = setTimeout(() => {
      document.documentElement.style.setProperty(`--number-of-child`, colorsArrayLocalStorage.length + 3)
      if (colorsArrayLocalStorage !== null) { 
        for (let i=0; i<colorsArrayLocalStorage.length; i++) {
          document.documentElement.style.setProperty(`--color-user-${i+1}`, colorsArrayLocalStorage[i].color)
        }
      }
  }, 0)
  return () => clearTimeout(timer)
  })



return (
  <div className={classes['colors']}>
    {colorsArrayLocalStorage && colorsArrayLocalStorage.map((item: Colors) => {
      return (

        <div key={item.id} className={classes['colors-container']}>
          <div className={classes['colors-container-item']} >
            {item.addedByUser && <button onClick={() => onRemoveColor(item.id)} className={classes['colors-container-item-button']}>X</button>}
            
          </div>
          <p className={classes['colors-container-item-name']}>{item.color}</p>
        </div>
        

      )
    })}
  </div>
)
}

export default ColorsContainer