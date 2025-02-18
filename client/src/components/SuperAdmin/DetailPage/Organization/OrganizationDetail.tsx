import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { IOrganization } from '../../../../types/dataTypes';
import axios from 'axios';
import { getToken } from '../../../../helpers/utilityFns';
import classes from './organization.module.css'
import { constant } from '../../../../helpers/constants';
import { Button } from '@mui/material';
import ActionButton from './ActionButton';
import Transactions from '../../../Admin/Transactions/Transactions';
import { useFetch } from '../../../../helpers/useFetch';

function OrganizationDetail() {
    const {id} = useParams();
    
    //const [data,setData] = useState<IOrganization | null>(null);
    const [update,setUpdate] = useState(1);
    const [fetchedData,loading,error] = useFetch<IOrganization>('/organization/'+id)
        
    let data: IOrganization;
    if (!error) {
      data = fetchedData as IOrganization;
    } else {
      return <p>Error while loading page</p>;
    }
    
    console.log(data);
    
    if(loading){
        return <p>Loading....</p>;
    }
    function triggerUpdate(){
        setUpdate(prev=>prev+1);
    }
  return (
    <div>
        {
            data && (
                <div className={classes.container}>
                <div className={classes.heading}>
                    <h1>Organisation Details</h1>
                </div>
                <div className={classes.detail}>
                    <div><span>Name :</span><h2>{data.name}</h2></div>
                    <div><span>Description :</span><p>{data.description}</p></div>
                    <div><span>Id :</span><p>{data.id}</p></div>
                </div>
                <ActionButton organization={data} triggerUpdate={triggerUpdate}/>
                <div>
                    <Transactions id={data.id}/>
                </div>
                </div>
            )
        }
    </div>
  )
}

export default OrganizationDetail