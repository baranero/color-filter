import classes from './ColorsFilter.module.scss'

const ColorsFilter: React.FC = () => {
  return (
    <div className={classes['colors-filter-container']}>
    <div className={classes['colors-filter-item']}>
      <input type="checkbox" name="red" id="red"/>
      <label htmlFor="red">Red &gt; 50%</label>
    </div>
    <div className={classes['colors-filter-item']}>
      <input type="checkbox" name="green" id="green"/>
      <label htmlFor="green">Green &gt; 50%</label>
    </div>
    <div className={classes['colors-filter-item']}>
      <input type="checkbox" name="blue" id="blue"/>
      <label htmlFor="blue">Blue &gt; 50%</label>
    </div>
    <div className={classes['colors-filter-item']}>
      <input type="checkbox" name="saturation" id="saturation"/>
      <label htmlFor="saturation">Saturation &gt; 50%</label>
    </div>
    </div>
  )
}

export default ColorsFilter