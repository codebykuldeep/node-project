import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { IUser } from '../../../../types/dataTypes';
import axios from 'axios';
import { getToken } from '../../../../helpers/utilityFns';
import classes from './user.module.css'
import { constant } from '../../../../helpers/constants';
import { Button } from '@mui/material';
import ActionButton from './ActionButtons';
import { useFetch } from '../../../../helpers/useFetch';


function UserDetail() {
    const {id} = useParams();

    const [fetchedData,loading,error] = useFetch<IUser>('/user/detail/'+id)
    
    
    let data: IUser;
      if (!error) {
        data = fetchedData as IUser;
      } else {
        return <p>Error while loading page</p>;
      }
    console.log(data);
    
    
    if(loading){
        return <p>Loading....</p>;
    }
  return (
    <div>
        {
            data && (
                <div className={classes.container}>
                <div className={classes.heading}>
                    <h1>User Details</h1>
                </div>
                <div className={classes.detail}>
                    <div><span>Name :</span><p>{data.name}</p></div>
                    <div><span>Email :</span><p>{data.email}</p></div>
                    <div><span>Phone number :</span><p>{data.number}</p></div>
                    <div><span>Organization id:</span><p>{data.organization_id}</p></div>
                </div>
                <ActionButton data={data}/>
                </div>
            )
        }
    </div>
  )
}

export default UserDetail;