import React, { useEffect, useState } from 'react';
import NewColor from './components/NewColor';
import ColorsContainer from './components/ColorsContainer';
import { defaultColors } from './data/defaultColors';

export interface Colors {
  id: string,
  color: string,
  addedByUser: boolean
}

const App: React.FC = () => {

  const [colorsArray, setColorsArray] = useState<Colors[]>([])
  
  useEffect(() => {
    const colorsFromLocalStorage = JSON.parse(localStorage.getItem('enteredColors')!)
    if (colorsFromLocalStorage) {
      setColorsArray(colorsFromLocalStorage)
      console.log("OK");
      
    } else {
      localStorage.setItem('enteredColors', JSON.stringify(defaultColors))
      console.log("OKOK");
    }
  }, [])

  const removeColor = (id: string) => {
    let colorToRemove = colorsArray.filter(item => item.id !== id)
    setColorsArray(colorToRemove)
    localStorage.setItem('enteredColors', JSON.stringify(colorToRemove))
    console.log(colorsArray);
  }

  const addColorToArray = (color: Colors) => {
    setColorsArray([...colorsArray, color])
    localStorage.setItem('enteredColors', JSON.stringify([...colorsArray, color]))
  }
  
  return (
    <>
      <NewColor onAddColor={addColorToArray}/>
      <ColorsContainer onRemoveColor={removeColor}/>
    </>
  );
}

export default App;
