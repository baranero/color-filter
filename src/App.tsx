import React, { useEffect, useState } from 'react';
import NewColor from './components/NewColor';
import ColorsContainer, { ColorItemProps } from './components/ColorsContainer';
import { defaultColors } from './data/defaultColors';

export interface Colors {
  id: string,
  hexColor: string,
  rgbColor: {r: number, g: number, b: number},
  addedByUser: boolean
}

export interface RemoveColorProps {
  onRemoveColor: (id: string) => void
}

const App: React.FC = () => {

  const [colorsArray, setColorsArray] = useState<Colors[]>([])

  const colorsFromLocalStorage = JSON.parse(localStorage.getItem('enteredColors')!)
  
  
  useEffect(() => {
    const colorsFromLocalStorage = JSON.parse(localStorage.getItem('enteredColors')!)

      const sortedColors = colorsFromLocalStorage?.sort((firstColor: Colors, secondColor: Colors) => {
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
    setColorsArray(sortedColors)
    
    if (colorsFromLocalStorage) {
      setColorsArray(colorsFromLocalStorage)
      localStorage.setItem('enteredColors', JSON.stringify(colorsFromLocalStorage))
    } else {
      localStorage.setItem('enteredColors', JSON.stringify(defaultColors))
    }


  }, [colorsArray.length, colorsFromLocalStorage?.length])

  useEffect(() => {

    document.documentElement.style.setProperty(`--number-of-child`, colorsFromLocalStorage?.length + 3)
    if (colorsFromLocalStorage !== null) { 
      for (let i=0; i<colorsFromLocalStorage.length; i++) {
        document.documentElement.style.setProperty(`--color-user-${i+1}`, colorsFromLocalStorage[i].hexColor)
      }
    }
}, [colorsFromLocalStorage])


  const removeColor = (id: string) => {
    let colorToRemove = colorsArray.filter(item => item.id !== id)
    setColorsArray(colorToRemove)
    localStorage.setItem('enteredColors', JSON.stringify(colorToRemove))

  }

  const addColorToArray = (color: Colors) => {
    setColorsArray([...colorsArray, color])
    localStorage.setItem('enteredColors', JSON.stringify([...colorsArray, color]))
    return
  }
console.log(colorsFromLocalStorage);

  return (
    <>
      <NewColor onAddColor={addColorToArray}/>
      <ColorsContainer onRemoveColor={removeColor}/>
    </>
  )
}

export default App;
