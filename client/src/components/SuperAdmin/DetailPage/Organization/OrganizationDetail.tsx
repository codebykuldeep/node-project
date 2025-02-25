import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

import classes from './organization.module.css'
import ActionButton from './ActionButton';
import Transactions from '../../../Admin/Transactions/Transactions';
import ShowHomeData from '../../../Admin/Home/ShowHomeData';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { apiCall } from '../../../../utils/httpMethod';

function OrganizationDetail() {
    const {id} = useParams();
    const {data,isFetching,isError,refetch} = useQuery({
        queryKey:['organization','detail',id],
        queryFn:()=>apiCall('GET','organization/detail/'+ id),
        placeholderData:keepPreviousData
       })
      
       
    if (isError) {
        return <p>Error while loading page</p>;
    }
    
    console.log(data);
    
    if(isFetching){
        return <p>Loading....</p>;
    }
    function triggerUpdate(){
        refetch();
    }
    const organization = data.data.organization;
  return (
    <div>
        {
            data && (
                <div className={classes.container}>
                <div className={classes.heading}>
                    <h1>Organisation Details</h1>
                </div>
                <ActionButton organization={organization} triggerUpdate={triggerUpdate}/>
                <div>
                    <ShowHomeData data={data.data}/>
                </div>
                <div>
                    <Transactions id={organization.organization_id}/>
                </div>
                </div>
            )
        }
    </div>
  )
}

export default OrganizationDetail