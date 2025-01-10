import classes from './searchbar.module.css';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar() {
  return (
    <div className={classes.search}>
        <div><SearchIcon/></div>
        <input type='text'></input>
        <div className={classes.result} style={{display:'none'}}></div>
    </div>
  )
}

export default SearchBar