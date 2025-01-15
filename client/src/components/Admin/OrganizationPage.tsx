import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { IOrganization } from '../../types/dataTypes';
import { getToken } from '../../helpers/utilityFns';
import { env } from '../../helpers/constants';
import classes from './organization-page.module.css'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { getOrganizationData } from '../../utils/fetchMethods';

function OrganizationPage() {
   const user = useSelector((state:RootState)=>state.userState.user)

    const [data,setData] = useState<IOrganization | null>(null);
    console.log(data);
    
    useEffect(()=>{
        try {
            getOrganizationData(user!.organization_id)
            .then(data=>setData(data));
        } catch (error) {
            console.log(error);
            
        }
    },[user])
  return (
    <div>
        {!data && <p>Loading....</p>}
        {
            data && (
                <div>
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

export default OrganizationPage;

