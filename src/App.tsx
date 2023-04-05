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

  const [colorsArray, setColorsArray] = useState<Colors[]>(defaultColors)

  useEffect(() => {
    
    let localStorageColors = localStorage.getItem('enteredColors')
    if (localStorageColors === null) {
      localStorage.setItem('enteredColors', JSON.stringify(defaultColors))
    } else {
      setColorsArray(JSON.parse(localStorageColors))
    }
  }, [])



  const addColorToArray = (color: Colors) => {
    
    setColorsArray([...colorsArray, color])
    localStorage.setItem('enteredColors', JSON.stringify([...colorsArray, color]))
  }

  const removeColor = (id: string) => {
    setColorsArray(prev => prev.filter(item => item.id !== id))
    localStorage.setItem('enteredColors', JSON.stringify([...colorsArray]))
  }
  return (
    <>
      <NewColor onAddColor={addColorToArray}/>
      <ColorsContainer onRemoveColor={removeColor}/>
    </>
  );
}

export default App;
