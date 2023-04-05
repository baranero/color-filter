import React, { useEffect, useState } from 'react';
import NewColor from './components/NewColor';
import ColorsContainer from './components/ColorsContainer';

export interface Colors {
  id: string,
  color: string,
  addedByUser: boolean
}


function App() {



  return (
    <>
      <NewColor/>
      <ColorsContainer/>
    </>
  );
}

export default App;
