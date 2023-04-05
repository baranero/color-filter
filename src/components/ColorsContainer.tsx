import { useEffect, useState } from 'react';
import { defaultColors } from '../data/defaultColors';
import classes from './ColorsContainer.module.scss'
import { Colors } from '../App';

const ColorsContainer = () => {

  document.documentElement.style.setProperty("--color-red", defaultColors[0].color);
  document.documentElement.style.setProperty("--color-green", defaultColors[1].color);
  document.documentElement.style.setProperty("--color-blue", defaultColors[2].color);

  const [colorsFromLocalStorage, setColorsFromLocalStorage] = useState<Colors[]>([])

  useEffect(() => {
    const colorsFromLocalStorage = JSON.parse(window.localStorage.getItem('enteredColor') || "[]")
    if (colorsFromLocalStorage) {
      setColorsFromLocalStorage(colorsFromLocalStorage)
    }
  }, [])

  const colorsArrayLocalStorage = (JSON.parse(localStorage.getItem('enteredColor') || "[]"))
  console.log(colorsFromLocalStorage);
  
  

return (
  <div className={classes['colors-container']}>
    <div className={classes['colors-container-default-red']}></div>
    <div className={classes['colors-container-default-green']}></div>
    <div className={classes['colors-container-default-blue']}></div>
    {colorsFromLocalStorage.map((item: Colors) => {
      return <div key={item.color} className={classes['colors-container-user']}>{item.color}</div>
    })}
  </div>
)
}

export default ColorsContainer