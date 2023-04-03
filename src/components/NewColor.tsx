import React, { useState } from 'react'
import classes from './NewColor.module.scss'

const NewColor = () => {

  const [enteredColor, setEnteredColor] = useState<string>('')

  const colorChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEnteredColor(event.target.value)
  }

  console.log(enteredColor)

  const submitHandler = (event: React.FormEvent): void => {
    event.preventDefault()
    localStorage.setItem("enteredColor", enteredColor)
    console.log(localStorage.getItem("enteredColor"));
    
  }
  

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor='color'>Color:</label>
      <input
        id='color'
        type='text'
        value={enteredColor}
        onChange={colorChangeHandler}
      />
      <button type='submit'>Submit</button>
    </form>
  )
}

export default NewColor