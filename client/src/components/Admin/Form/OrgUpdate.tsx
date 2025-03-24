import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useQuery } from '@tanstack/react-query';
import { apiCall } from '../../../utils/httpMethod';
import { IOrganization } from '../../../types/dataTypes';
import OrgUpdateForm from './OrgUpdateForm';

function OrgUpdate() {
    const user = useSelector((state: RootState) => state.userState.user);
    const [organization,setOrganization] = useState<IOrganization | null>(null);
    const [fetch,setFetch] = useState(true);
    const {data,isFetching,isError} = useQuery({
        queryKey:['organization',user!.organization_id],
        queryFn:()=>apiCall('GET','organization/'+ user!.organization_id),
        enabled:fetch
    })
    useEffect(()=>{
        if(data){
            setOrganization(data.data);
            setFetch(false);
        }
    },[data])

    if(isFetching){
        return <p>Loading....</p>
    }
    if(isError){
        return <p>Error</p>
    }
  return (
    <>
    {organization && <OrgUpdateForm  organization={organization!}/>}
    </>
  )
}

export default OrgUpdate