import React, { useEffect, useState } from 'react'
import classes from './NewColor.module.scss'
import { Colors } from '../App'

interface NewColorProps {
  onAddColor: (enteredColor: Colors) => void
}

const NewColor: React.FC<NewColorProps> = ({ onAddColor }) => {

  const defaultValues = {
    id: '',
    color: '',
    addedByUser: true
  }

  const [enteredColor, setEnteredColor] = useState<Colors>(defaultValues)

  let inputValueisIncorrect: boolean = enteredColor.color.includes('#', 1)

  const colorChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (inputValueisIncorrect) {
      setEnteredColor({
        id: '',
        color: enteredColor.color.slice(0, -1),
        addedByUser: true
      })
    } else {
      setEnteredColor({
        id: Math.random().toString(16).slice(2),
        color: event.target.value.toUpperCase(),
        addedByUser: true
      })
    }
  }

  const submitHandler = (event: React.FormEvent): void => {

    onAddColor(enteredColor)
    event.preventDefault()
    setEnteredColor(defaultValues)
  }

  return (
    <form onSubmit={submitHandler} className={classes['color-form']} >
      <label htmlFor='color' className={classes['color-form-label']} >Color:</label>
      <input
        className={classes[inputValueisIncorrect ? 'color-form-input-wrong' : 'color-form-input']}
        id='color'
        type='text'
        value={enteredColor.color}
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