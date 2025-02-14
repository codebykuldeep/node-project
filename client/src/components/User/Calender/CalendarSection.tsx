import React, { useEffect, useState } from 'react'
import Calendar from './Calendar';
import classes from './calendar-section.module.css';
import { IEvent, IOrganization, ITransaction } from '../../../types/dataTypes';
import axios from 'axios';
import { constant } from '../../../helpers/constants';
import { getToken } from '../../../helpers/utilityFns';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { createEventArray, getTransactionData } from './calenderFuncstions';
import PaymentModal from './PaymentModal';
import { useFetch } from '../../../helpers/useFetch';

function CalenderSection() {
  const user = useSelector((state:RootState)=>state.userState.user);
  const [data,setData] = useState<ITransaction[] | null>(null);
  const [events,setEvents] = useState<IEvent[] | null>(null);
  const [selectedDate,setSelectedDate] = useState<string>('');
  const [open, setOpen] = React.useState(false);


  const [orgData,loading,error] = useFetch<IOrganization>('/organization/'+user!.organization_id)
  console.log('hook',orgData);
  

  const handleOpen = (date:string) => {
    const tData = getTransactionData(user!.created_at,data!);
    setSelectedDate(date);
    if(tData[date] === false){
      setOpen(true);
    }
  };
  const handleClose = () => setOpen(false);

  useEffect(()=>{
    async function getData() {
        const {data} = await axios.get(constant.SERVER +'/transactions/'+user!.id,{
            headers:{
                'Authorization':getToken(),
            },
        })
        console.log(data);
        
        setData(data.data)
        setEvents(createEventArray(user!.created_at,data.data));
    }
    try {
        getData();
    } catch (error) {
        console.log(error);
        
    }
  },[user])
  return (
    <div className={classes.container}>
        <div className={classes.heading}>
          <h1>Payment Track</h1>
        </div>
       {events &&  <Calendar events ={events} handleOpen={handleOpen}/>}
       {!loading && <PaymentModal open={open} handleClose={handleClose} date={selectedDate} organization={orgData as IOrganization}/>}
    </div>
  )
}

export default CalenderSection



