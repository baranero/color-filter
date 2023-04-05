import { useEffect, useState } from 'react';
import { defaultColors } from '../data/defaultColors';
import classes from './ColorsContainer.module.scss'
import { Colors } from '../App';

const ColorsContainer = () => {

  const colorsArrayLocalStorage = (JSON.parse(localStorage.getItem('enteredColors')!))
  
  useEffect(() => {

    const timer = setTimeout(() => {
      document.documentElement.style.setProperty(`--number-of-child`, colorsArrayLocalStorage.length + 3)
      if (colorsArrayLocalStorage !== null) { 
        for (let i=0; i<colorsArrayLocalStorage.length; i++) {
          document.documentElement.style.setProperty(`--color-user-${i+1}`, colorsArrayLocalStorage[i].color)
        }
      }
  }, 1)
  return () => clearTimeout(timer)
  })



return (
  <div className={classes['colors-container']}>
    {colorsArrayLocalStorage && colorsArrayLocalStorage.map((item: Colors) => {
      return <div className={classes['colors-container-item']} key={item.id}><p>{item.color}</p></div>
    })}
  </div>
)
}

export default ColorsContainer