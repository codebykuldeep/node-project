import React, { useState } from 'react';
import classes from './searchbar.module.css';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar() {
  const [show,SetShow] = useState(false);

  function handleChange(event:React.ChangeEvent<HTMLInputElement>){
    if(event.target.value.trim() === ''){
      SetShow(false);
    }
    else{
      SetShow(true);
    }
  }
  return (
    <div className={classes.search}>
        <div><SearchIcon/></div>
        <input type='text' onChange={handleChange}></input>
        <div className={classes.result} style={{display:show ? 'block' :'none'}}></div>
    </div>
  )
}

export default SearchBar