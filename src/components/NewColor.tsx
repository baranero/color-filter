import React, { useEffect, useState } from 'react'
import classes from './NewColor.module.scss'

const NewColor = () => {

  const [enteredColor, setEnteredColor] = useState<string>('')

  let inputValueisIncorrect: boolean = enteredColor.includes('#', 1)

    const colorChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
      if (inputValueisIncorrect) {
     
        setEnteredColor(enteredColor.slice(0, -1))
      } else {
        setEnteredColor(event.target.value)
      }
      
    }  

  const submitHandler = (event: React.FormEvent): void => {
    event.preventDefault()
    localStorage.setItem("enteredColor", enteredColor)
    console.log(localStorage.getItem("enteredColor"));
  }
  

  return (
    <form onSubmit={submitHandler} className={classes['color-form']} >
      <label htmlFor='color' className={classes['color-form-label']} >Color:</label>
      <input
        className={classes[inputValueisIncorrect ? 'color-form-input-wrong' : 'color-form-input']}
        id='color'
        type='text'
        value={enteredColor}
        onChange={colorChangeHandler}
        placeholder='Input color in HEX format (eg. #3F3F3F)'
        maxLength={7}
      />
      {!inputValueisIncorrect ? '' : <p className={classes['color-form-warning']} >You can use # sign only as first</p>}
      <button
      className={classes['color-form-button']} type='submit'>Submit</button>
    </form>
  )
}

export default NewColor