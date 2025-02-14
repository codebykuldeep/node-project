import React from 'react'
import { SerachResultResponse } from '../../../types/dataTypes';
import classes from './search-result.module.css'
import ResultCard from './ResultCard';


interface SearchResultProps{
    data:SerachResultResponse;
}
function SearchResult({data}:SearchResultProps) {
    if(!data){
        return <p>No results found...</p>
    }
    console.log(data);
    
    const {organizations,admins,users} = data;
  return (
    <div className={classes.container}>
      <ResultCard label='Organizations' data={organizations}/>
      <ResultCard label='Admins' data={admins}/>
      <ResultCard label='Users' data={users}/>
    </div>
  );
}

export default SearchResult