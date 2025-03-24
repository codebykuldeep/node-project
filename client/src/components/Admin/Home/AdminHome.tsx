import React from 'react'
import ShowHomeData from './ShowHomeData'

import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { useQuery } from '@tanstack/react-query'
import { apiCall } from '../../../utils/httpMethod'
import { Typography } from '@mui/material'

function AdminHome() {
    const user = useSelector((state:RootState)=>state.userState.user)
    const {data,isFetching,isError} = useQuery({
     queryKey:['organization','detail',user!.organization_id],
     queryFn:()=>apiCall('GET','organization/detail/'+ user!.organization_id)
    })
     
     if(isFetching){
         return <p>Loading....</p>
     }
     if(isError){
         return <p>Error while fetching</p>
     }
   return (
     <div>
        <Typography>Hello , {user?.name}</Typography>
         {
             data && data.data && (
                 <ShowHomeData data={data.data}/>
             )
         }
     </div>
   )
 }

export default AdminHome