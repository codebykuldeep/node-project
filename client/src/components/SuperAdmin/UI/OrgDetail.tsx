import React, { useEffect, useState } from 'react'
import { IOrganization } from '../../../types/dataTypes';
import { env } from '../../../helpers/constants';
import axios from 'axios';
import { getToken } from '../../../helpers/utilityFns';
import { useParams } from 'react-router-dom';
import classes from './detail.module.css'

function OrgDetail() {
    const {id} = useParams();
    
    const [data,setData] = useState<IOrganization | null>(null);
    useEffect(()=>{
        async function getData() {
            const {data} = await axios.get(env.SERVER +'/organization',{
                headers:{
                    'Authorization':getToken(),
                }
            })
            setData(data.data.organizations[0])

        }
        try {
            getData();
        } catch (error) {
            console.log(error);
            
        }
    },[])
  return (
    <div>
        {!data && <p>Loading....</p>}
        {
            data && (
                <div className={classes.container}>
                <div className={classes.heading}>
                    <h1>Organisation Details</h1>
                </div>
                <div className={classes.detail}>
                    <h2>{data.name}</h2>
                    <p>{data.description}</p>
                </div>
                </div>
            )
        }
    </div>
  )
}

export default OrgDetail;

