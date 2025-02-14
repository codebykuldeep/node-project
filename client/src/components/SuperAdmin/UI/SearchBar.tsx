import React, { useRef, useState } from 'react';
import classes from './searchbar.module.css';
import SearchIcon from '@mui/icons-material/Search';
import { constant } from '../../../helpers/constants';
import axios from 'axios';
import { getToken } from '../../../helpers/utilityFns';
import SearchResult from './SearchResult';
import { fetchSearchResults } from '../../../utils/fetchMethods';
import { SerachResultResponse } from '../../../types/dataTypes';

function SearchBar() {
  const [show,SetShow] = useState(false);
  const [data,setData] = useState<SerachResultResponse|null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> |null>(null);

  async function handleChange(event:React.ChangeEvent<HTMLInputElement>){
    const query = event.target.value;
    if(event.target.value.trim() !== ''){
      SetShow(true);
      clearTimeout(debounceRef.current!);
      debounceRef.current = setTimeout(async ()=>{
        const  result = await fetchSearchResults(query);
        setData(result);
      },500)
    }
    else{
      SetShow(false);
    }
  }
  return (
    <div className={classes.search}>
        <div><SearchIcon/></div>
        <input type='text' onChange={handleChange}></input>
        <div className={classes.result} style={{display:show ? 'block' :'none'}}>
          <SearchResult data={data!}/>
        </div>
    </div>
  )
}

export default SearchBar