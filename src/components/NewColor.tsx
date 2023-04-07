import React, { useEffect, useState } from 'react'
import classes from './NewColor.module.scss'
import { Colors } from '../App'

interface NewColorProps {
  onAddColor: (enteredColor: Colors) => void
}

const NewColor: React.FC<NewColorProps> = ({ onAddColor }) => {

  const defaultValues = {
    id: '',
    hexColor: '',
    rgbColor: {r: null!, g: null!, b: null!},
    addedByUser: true
  }

  const [enteredColor, setEnteredColor] = useState<Colors>(defaultValues)

  let inputValueisIncorrect: boolean = enteredColor.hexColor.includes('#', 1)

  const hexToRgb = (hex: string) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
  

  const colorChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (inputValueisIncorrect) {
      setEnteredColor({
        id: '',
        hexColor: enteredColor.hexColor.slice(0, -1),
        rgbColor: {r: null!, g: null!, b: null!},
        addedByUser: true
      })
    } else {
      setEnteredColor({
        id: Math.random().toString(16).slice(2),
        hexColor: event.target.value.toUpperCase(),
        rgbColor: hexToRgb(event.target.value)!,
        addedByUser: true
      })
    }
  }

  const submitHandler = (event: React.FormEvent): void => {

    
    event.preventDefault()
    onAddColor(enteredColor)
    setEnteredColor(defaultValues)
  }

  return (
    <form onSubmit={submitHandler} className={classes['color-form']} >
      <label htmlFor='color' className={classes['color-form-label']} >Color:</label>
      <input
        className={classes[inputValueisIncorrect ? 'color-form-input-wrong' : 'color-form-input']}
        id='color'
        type='text'
        value={enteredColor.hexColor}
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