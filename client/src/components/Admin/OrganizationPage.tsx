import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { IOrganization } from '../../types/dataTypes';
import { getToken } from '../../helpers/utilityFns';
import { constant } from '../../helpers/constants';
import classes from './organization-page.module.css'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { getOrganizationData } from '../../utils/fetchMethods';
import { useFetch } from '../../helpers/useFetch';

function OrganizationPage() {
   const user = useSelector((state:RootState)=>state.userState.user)
    const [fetchedData,loading,error] = useFetch<IOrganization>('/organization/'+ user!.organization_id)
    
    let data:IOrganization;
    if(!error){
        data = fetchedData as IOrganization;
    }
    else{
        return <p>Error while loading page</p>
    }

  return (
    <div>
        {loading && <p>Loading....</p>}
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

