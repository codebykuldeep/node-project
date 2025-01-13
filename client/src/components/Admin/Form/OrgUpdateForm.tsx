import React, { useEffect, useState } from 'react'
import InputField from './InputField';
import classes from './form.module.css';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { IOrganization } from '../../../types/dataTypes';
import { getOrganizationData } from '../../../utils/fetchMethods';

function OrgUpdateForm() {
  const user = useSelector((state:RootState)=>state.userState.user)

  const [data,setData] = useState<IOrganization | null>(null);
  console.log(data);
  
  useEffect(()=>{
      try {
          getOrganizationData(user!.organization_id)
          .then(data=>setData(data));
      } catch (error) {
          console.log(error);
          
      }},
    [])

  if(!data){
    return <p>Loading...</p>
  }
  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <h1>Add a new Organization</h1>
      </div>
      <form className={classes.form} action="">
      <InputField type='text' name='name' label='Name' value={data.name}/>
      <InputField type='text' name='description' label='Description' value={data.description}/>
      <InputField type='text' name='payment_id' label='Payment id' value={data.payment_id}/>
      <InputField type='file' name='payment_url' label=''/>
      <div>
      <Button type='button' variant='contained'>Update</Button>
      </div>
      </form>
    </div>
  )
}

export default OrgUpdateForm;