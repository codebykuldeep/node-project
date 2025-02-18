import React, { useEffect, useMemo, useState } from 'react'
import Calendar from './Calendar';
import classes from './calendar-section.module.css';
import { IEvent, IOrganization, IUser } from '../../../types/dataTypes';
import { createEventArray, getTransactionData } from './calenderFuncstions';
import PaymentModal from './PaymentModal';
import { useQuery } from '@tanstack/react-query';
import { apiCall } from '../../../utils/httpMethod';

interface Props{
  organization:IOrganization;
  user:IUser;
  open:boolean;
  handleModal:(state:boolean)=>void;
}

function CalenderSection({organization,user,open,handleModal}:Props) {
  //const [events,setEvents] = useState<IEvent[] | null>(null);
  const [selectedDate,setSelectedDate] = useState<string>('');
  const {data ,isFetching ,isError} =useQuery({
    queryKey:['transactions',user.user_id],
    queryFn:()=>apiCall('GET','transactions/'+user!.user_id,{
      type:'credit'
    }),
    enabled:!open,
  })
  const events =useMemo(()=>{
    if(data){
      return createEventArray(user!.created_at,data.data);
    }
    else{
      return null;
    }
  },[data,user])
  // useEffect(()=>{
  //   if(data && data.data.length > 0){
  //     setEvents(createEventArray(user!.created_at,data.data));
  //   }
  // },[data,user])

  const handleOpen = (date:string) => {
    const tData = getTransactionData(user!.created_at,data.data);
    setSelectedDate(date);
    if(tData[date] === false){
      handleModal(true);
    }
  };
  const handleClose = () => {
    handleModal(false);
  }

 

  if(isFetching){
    return <p>Loading ....</p>
  }

  if(isError){
    return <p>Error while loading the page....</p>
  }
  
  return (
    <div className={classes.container}>
        <div className={classes.heading}>
          <h1>Payment Track</h1>
        </div>
       {events &&  <Calendar events ={events} handleOpen={handleOpen}/>}
       {open && <PaymentModal open={open} handleClose={handleClose} date={selectedDate} organization={organization}/>}
    </div>
  )
}

export default CalenderSection



