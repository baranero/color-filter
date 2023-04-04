import { defaultColors } from '../data/defaultColors';
import classes from './ColorsContainer.module.scss'

const ColorsContainer = () => {

  document.documentElement.style.setProperty("--color-red", defaultColors[0].color);
  document.documentElement.style.setProperty("--color-green", defaultColors[1].color);
  document.documentElement.style.setProperty("--color-blue", defaultColors[2].color);

return (
  <div className={classes['colors-container']}>
    <div className={classes['colors-container-default-red']}></div>
    <div className={classes['colors-container-default-green']}></div>
    <div className={classes['colors-container-default-blue']}></div>
    <div className={classes['colors-container-user']}></div>
  </div>
)
}

export default ColorsContainer