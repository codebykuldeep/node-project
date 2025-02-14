import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { IUser } from '../../../../types/dataTypes';
import axios from 'axios';
import { getToken } from '../../../../helpers/utilityFns';
import classes from './user.module.css'
import { env } from '../../../../helpers/constants';
import { Button } from '@mui/material';
import ActionButton from './ActionButtons';


function UserDetail() {
    const {id} = useParams();
    
    const [data,setData] = useState<IUser | null>(null);
    useEffect(()=>{
        async function getData() {
            const {data} = await axios.get(env.SERVER +'/user/detail/'+id,{
                headers:{
                    'Authorization':getToken(),
                }
            })
            setData(data.data.user);
            
        }
        try {
            getData();
        } catch (error) {
            console.log(error);
            
        }
    },[id])

    console.log(data?.id);
    
    if(!data){
        return <p>Loading....</p>;
    }
  return (
    <div>
        {
            data && (
                <div className={classes.container}>
                <div className={classes.heading}>
                    <h1>Admin Details</h1>
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