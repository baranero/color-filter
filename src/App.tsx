import React, { useEffect, useState } from 'react';
import NewColor from './components/NewColor';
import ColorsContainer from './components/ColorsContainer';

export interface Colors {
  id: string,
  color: string,
  addedByUser: boolean
}


const App: React.FC = () => {

  const [colorsArray, setColorsArray] = useState<Colors[]>([])



  const addColorToArray = (color: Colors) => {
    
    setColorsArray([...colorsArray, color])
    localStorage.setItem('enteredColors', JSON.stringify([...colorsArray, color]))
  }

      useEffect(() => {
    
    let localStorageColors = localStorage.getItem('enteredColors')
    if (localStorageColors !== null) {
      setColorsArray(JSON.parse(localStorageColors))
    }
    
  }, [])

  return (
    <>
      <NewColor onAddColor={addColorToArray}/>
      <ColorsContainer/>
    </>
  );
}

export default App;
