import { useEffect, useState } from 'react';
import { defaultColors } from '../data/defaultColors';
import classes from './ColorsContainer.module.scss'
import { Colors } from '../App';

const ColorsContainer = () => {

  document.documentElement.style.setProperty("--color-red", defaultColors[0].color);
  document.documentElement.style.setProperty("--color-green", defaultColors[1].color);
  document.documentElement.style.setProperty("--color-blue", defaultColors[2].color);

 

  const colorsArrayLocalStorage = (JSON.parse(localStorage.getItem('enteredColors') || "[]"))
  
  useEffect(() => {
    document.documentElement.style.setProperty(`--number-of-child`, colorsArrayLocalStorage.length + 3)
    if (colorsArrayLocalStorage !== null) { 
      for (let i=0; i<colorsArrayLocalStorage.length; i++) {
        document.documentElement.style.setProperty(`--color-user-${i+4}`, colorsArrayLocalStorage[i].color)
      }
    }
  })


  console.log(colorsArrayLocalStorage);  

return (
  <div className={classes['colors-container']}>
    <div className={classes['colors-container-default-red']}></div>
    <div className={classes['colors-container-default-green']}></div>
    <div className={classes['colors-container-default-blue']}></div>
    {colorsArrayLocalStorage.map((item: Colors) => {
      return <><div key={item.id} className={classes['colors-container']}><p>{item.color}</p></div></>
    })}
  </div>
)
}

export default ColorsContainer