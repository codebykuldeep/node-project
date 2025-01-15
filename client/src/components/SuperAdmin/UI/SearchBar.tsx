import React, { useState } from 'react';
import classes from './searchbar.module.css';
import SearchIcon from '@mui/icons-material/Search';
import { env } from '../../../helpers/constants';
import axios from 'axios';

function SearchBar() {
  const [show,SetShow] = useState(false);

  async function handleChange(event:React.ChangeEvent<HTMLInputElement>){
    if(event.target.value.trim() === ''){
      SetShow(false);
      const {data} = await axios.get(env.SERVER + '/admin/search',{
        params:{
          query:
        }
      })
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