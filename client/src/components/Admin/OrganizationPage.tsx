import React from 'react'
import classes from './organization-page.module.css'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useQuery } from '@tanstack/react-query';
import { apiCall } from '../../utils/httpMethod';
import OrgPage from '../Common/OrgPage/OrgPage';

function OrganizationPage() {
   const user = useSelector((state:RootState)=>state.userState.user)
   const {data,isFetching,isError} = useQuery({
    queryKey:['organization',user!.organization_id],
    queryFn:()=>apiCall('GET','organization/'+ user!.organization_id)
   })
    
    if(isFetching){
        return <p>Loading....</p>
    }
    if(isError){
        return <p>Error while fetching</p>
    }
    const organization = data.data;
   
  return (
    <div>
        {
            data && organization && (
                // <div>
                // <div className={classes.heading}>
                //     <h1>Organisation Details</h1>
                // </div>
                // <div className={classes.detail}>
                //     <h2>{organization.name}</h2>
                //     <p>{organization.description}</p>
                // </div>
                // </div>
                <OrgPage organization={organization}/>
            )
        }
    </div>
  )
}

export default OrganizationPage;

