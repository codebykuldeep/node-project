import React from 'react'
import { useParams } from 'react-router-dom';
import { IUser } from '../../../../types/dataTypes';
import classes from './user.module.css'
import ActionButton from './ActionButtons';
import { useQuery } from '@tanstack/react-query';
import { apiCall } from '../../../../utils/httpMethod';


function UserDetail() {
    const {id} = useParams();
    const {data,isFetching,isError} = useQuery({
      queryKey:['user',id],
      queryFn:()=>apiCall('GET','user/detail/'+id)
    })
    

    if(isFetching){
      return <p>Loading....</p>
    }
    if(isError){
      return <p>Error while loading...</p>
    }
    const  user = data.data as IUser;
    
  return (
    <div>
        {
            data && user && (
                <div className={classes.container}>
                <div className={classes.heading}>
                    <h1>User Details</h1>
                </div>
                <div className={classes.detail}>
                    <div><span>Name :</span><p>{user.name}</p></div>
                    <div><span>Email :</span><p>{user.email}</p></div>
                    <div><span>Phone number :</span><p>{user.number}</p></div>
                    <div><span>Organization id:</span><p>{user.organization_id}</p></div>
                </div>
                <ActionButton data={user} role='USER' select='user_id'/>
                </div>
            )
        }
    </div>
  )
}

export default UserDetail;