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

  console.log(colorsArray);

  useEffect(() => {
    
    let localStorageColors = localStorage.getItem('enteredColors')
    if (localStorageColors === null) {
      localStorage.setItem('enteredColors', JSON.stringify(defaultColors))
    }
    
    if (localStorageColors) {
      setColorsArray(JSON.parse(localStorageColors))
    } else {
      
      
    }
  }, [])



  const addColorToArray = (color: Colors) => {
    
    setColorsArray([...colorsArray, color])
    localStorage.setItem('enteredColors', JSON.stringify([...colorsArray, color]))
  }
console.log(colorsArray);

  return (
    <>
      <NewColor onAddColor={addColorToArray}/>
      <ColorsContainer/>
    </>
  );
}

export default App;
