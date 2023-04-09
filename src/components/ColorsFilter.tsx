import { SetStateAction, useEffect } from 'react';
import { Colors } from '../App';
import classes from './ColorsFilter.module.scss'

interface ColorsFilterProps {
  filteredColors: Colors[];
  setFilteredColors: React.Dispatch<SetStateAction<Colors[]>>;
  colorsArray: Colors[]
}

const ColorsFilter = ({ filteredColors, setFilteredColors, colorsArray }: ColorsFilterProps) => {

  const colorFilter = (event: React.ChangeEvent<HTMLInputElement>): void => {

    const redCheckbox = document.getElementById("red") as HTMLInputElement | null
    const greenCheckbox = document.getElementById("green") as HTMLInputElement | null
    const blueCheckbox = document.getElementById("blue") as HTMLInputElement | null

    if (redCheckbox?.checked && greenCheckbox?.checked && blueCheckbox?.checked) {
      setFilteredColors(JSON.parse(localStorage.getItem('enteredColors')!).filter((colors: any) => colors.rgbColor.r > 127 && colors.rgbColor.g > 127 && colors.rgbColor.b > 127))
    } else if (redCheckbox?.checked && greenCheckbox?.checked) {
      setFilteredColors(JSON.parse(localStorage.getItem('enteredColors')!).filter((colors: any) => colors.rgbColor.r > 127 && colors.rgbColor.g > 127))
    } else if ( redCheckbox?.checked && blueCheckbox?.checked) {
      setFilteredColors(JSON.parse(localStorage.getItem('enteredColors')!).filter((colors: any) => colors.rgbColor.r > 127 && colors.rgbColor.b > 127))
    } else if (greenCheckbox?.checked && blueCheckbox?.checked) {
      setFilteredColors(JSON.parse(localStorage.getItem('enteredColors')!).filter((colors: any) => colors.rgbColor.g > 127 && colors.rgbColor.b > 127))
    } else if (redCheckbox?.checked) {
      setFilteredColors(colorsArray.filter((colors: any) => colors.rgbColor.r > 127))
    } else if (greenCheckbox?.checked) {
      setFilteredColors(JSON.parse(localStorage.getItem('enteredColors')!).filter((colors: any) => colors.rgbColor.g > 127))
    } else if (blueCheckbox?.checked) {
      setFilteredColors(JSON.parse(localStorage.getItem('enteredColors')!).filter((colors: any) => colors.rgbColor.b > 127))
    } else {
      setFilteredColors([])
    }

  }


  return (
    <div className={classes['colors-filter-container']}>
    <div className={classes['colors-filter-item']}>
      <input type="checkbox" onChange={colorFilter} value="red"  name="red" id="red"/>
      <label htmlFor="red">Red &gt; 50%</label>
    </div>
    <div className={classes['colors-filter-item']}>
      <input type="checkbox" onChange={colorFilter} value="green"  name="green" id="green"/>
      <label htmlFor="green">Green &gt; 50%</label>
    </div>
    <div className={classes['colors-filter-item']}>
      <input type="checkbox" onChange={colorFilter} value="blue" name="blue" id="blue"/>
      <label htmlFor="blue">Blue &gt; 50%</label>
    </div>
    <div className={classes['colors-filter-item']}>
      <input type="checkbox" onChange={colorFilter} value="saturation" name="saturation" id="saturation"/>
      <label htmlFor="saturation">Saturation &gt; 50%</label>
    </div>
    </div>
  )
}

export default ColorsFilter