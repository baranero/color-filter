import React, { useEffect, useState } from 'react';
import NewColor from './components/NewColor';
import ColorsContainer, { ColorItemProps } from './components/ColorsContainer';
import { defaultColors } from './data/defaultColors';
import ColorsFilter from './components/ColorsFilter';

export interface Colors {
  id: string,
  hexColor: string,
  rgbColor: {r: number, g: number, b: number},
  hslColor: {h: number, s: number, l: number},
  addedByUser: boolean
}

const App: React.FC = () => {

  const [colorsArray, setColorsArray] = useState<Colors[]>([])
  const [filteredColors, setFilterdColors] = useState<Colors[]>([])
  const [sortedColors, setSortedColors] = useState<Colors[]>([])

  console.log(sortedColors);
  console.log(colorsArray);
  
  

  let colorsFromLocalStorage = JSON.parse(localStorage.getItem('enteredColors')!)
  useEffect(() => {

    document.documentElement.style.setProperty(`--number-of-child`, colorsFromLocalStorage?.length + 3)
    if (colorsFromLocalStorage !== null) {
      if (filteredColors.length > 0) {
        for (let i=0; i<filteredColors?.length; i++) {
          document.documentElement.style.setProperty(`--color-user-${i+1}`, filteredColors[i].hexColor)
          console.log("KOKO");
          
        }
      } else {
        for (let i=0; i<sortedColors?.length; i++) {
          document.documentElement.style.setProperty(`--color-user-${i+1}`, sortedColors[i].hexColor)

          
          console.log("OK");
          
        }
      }
      
    }
}, [filteredColors, sortedColors, colorsFromLocalStorage])

  useEffect(() => {

    if (!colorsFromLocalStorage) {
      localStorage.setItem('enteredColors', JSON.stringify(defaultColors)) 
      setSortedColors(defaultColors)
      setColorsArray(defaultColors)
     } else {
      setColorsArray(colorsFromLocalStorage)
      setSortedColors(colorsFromLocalStorage)
     }

     
    // let colorsToSort = filteredColors.length === 0 ? colorsFromLocalStorage : filteredColors
    
    

    const sortedColors = colorsArray?.sort((firstColor: Colors, secondColor: Colors) => {
      
      if (firstColor.rgbColor.r !== secondColor.rgbColor.r) {
        return secondColor.rgbColor.r - firstColor.rgbColor.r
      }
      if (firstColor.rgbColor.g !== secondColor.rgbColor.g) {
        return secondColor.rgbColor.g - firstColor.rgbColor.g
      }
      if (firstColor.rgbColor.b !== secondColor.rgbColor.b) {
        return secondColor.rgbColor.b - firstColor.rgbColor.b
      }
      return 0
    })

  if (sortedColors?.length > 0) {
    setSortedColors(sortedColors)

    localStorage.setItem('enteredColors', JSON.stringify(sortedColors))
  }
  
  }, [colorsFromLocalStorage?.length, filteredColors, colorsArray?.length])

  

  const removeColor = (id: string) => {
    let colorToRemove = colorsArray.filter(item => item.id !== id)
    setColorsArray(colorToRemove)
    localStorage.setItem('enteredColors', JSON.stringify(colorToRemove))

  }

  const addColorToArray = (color: Colors) => {
    setColorsArray([...colorsArray, color])
    localStorage.setItem('enteredColors', JSON.stringify([...colorsArray, color]))
    return;
  }
  

  return (
    <>
      <NewColor onAddColor={addColorToArray}/>
      <ColorsFilter colorsArray={colorsArray} filteredColors={filteredColors} setFilteredColors={setFilterdColors}/>
      <ColorsContainer filteredColors={filteredColors} sortedColors={sortedColors} setSortedColors={setSortedColors} onRemoveColor={removeColor}/>
    </>
  )
}

export default App;
