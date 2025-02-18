import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { useQuery } from '@tanstack/react-query';
import { apiCall } from '../../../utils/httpMethod';
import CalenderSection from './CalendarSection';

function CalenderPage() {
    const user = useSelector((state:RootState)=>state.userState.user);
    const [openModal,setOpenModal] = useState(false);
    const {data,isFetching,isError} = useQuery({
        queryKey:['organization',user!.organization_id],
        queryFn:()=>apiCall('GET','organization/'+user!.organization_id),
        enabled:!openModal
    })
    if(isFetching){
        return <p>Loading data ....</p>
    }

    if(isError){
        return <p>Error while loading page</p>
    }
    function handleQuery(state:boolean){
        setOpenModal(state);
    }
  return (
    <CalenderSection organization={data.data} user={user!} open={openModal} handleModal={handleQuery}/>
  )
}

export default CalenderPage