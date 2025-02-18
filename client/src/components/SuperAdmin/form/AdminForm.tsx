import React, { useEffect, useState } from 'react'
import InputField from './InputField';
import classes from './form.module.css';
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { IOrganization } from '../../../types/dataTypes';
import { getToken } from '../../../helpers/utilityFns';
import axios from 'axios';
import { constant } from '../../../helpers/constants';
import { ErrorState } from '../../../types/errorTypes';
import { checkValidFormState, populateFormState, validation } from '../../../utils/validationMethods';
import { useFetch } from '../../../helpers/useFetch';
import Loading from '../../Common/Loading';
import { apiCall } from '../../../utils/httpMethod';

const initialformState ={
  name:{
      status:false,
      message:'',
      value:''
  },
  email:{
      status:false,
      message:'',
      value:''
  },
  number:{
      status:false,
      message:'',
      value:''
  },
  organization_id:{
      status:false,
      message:'',
      value:''
  },
}

function AdminForm() {
  
    const [formState,setFormState] = useState<ErrorState>(initialformState);
    const [fetchData,error,loading] = useFetch('/organization');
    let organizations:IOrganization[];
    if(error){
      return <p>Error while loading page...</p>
    }
    else{
      organizations = fetchData as IOrganization[];
    }
   
    
      function handleFormChange(event:React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>){
        
        
        const name = event.target.name;
        const value = event.target.value;
        console.log(name,'-->',value);
        
        const [msg,status] = validation(name,value)
        setFormState((prev)=>({
          ...prev,
          [name]:{
            message:msg,
            status:status,
            value:value
          }
        }))  
      }
      async function handleSubmit(event:React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        console.log(formState);
        
        if(checkValidFormState(formState)){
          const formData = new FormData(event.target as HTMLFormElement );
          const body = Object.fromEntries(formData.entries());
          
          const data = await apiCall('POST','admin/register',null,body);
          console.log(body);
          
          alert(data.success)
          if(data.success){
            // setFormState(initialformState);
          // (event.target as HTMLFormElement).reset();
          }
          else{
            
          }
          
        }
        else{
          setFormState(populateFormState(formState));
          alert('failed')
        }
      }

      if(loading){
        return <Loading/>
      }
  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <h1>Add a new Admin</h1>
      </div>
      <form className={classes.form} onSubmit={handleSubmit}>
      <InputField type='text' name='name' label='Name' onChange={handleFormChange} formState={formState}/>
      <InputField type='text' name='email' label='Email' onChange={handleFormChange} formState={formState}/>
      <InputField type='number' name='number' label='Phone Number' onChange={handleFormChange} formState={formState}/>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="Organizations" error={formState['organization_id'].status}>Organizations</InputLabel>
        <Select
          labelId="Organizations"
          id="Organizations"
          label="Organizations"
          name='organization_id'
          value={formState['organization_id'].value}
          onChange={handleFormChange}
          error={formState['organization_id'].status}
        >
          <MenuItem disabled value=''>Select a Option</MenuItem>
          {
            organizations?.map((organization,index)=>(
                <MenuItem key={index} value={organization.organization_id}>{organization.name}</MenuItem>
            ))
          }
        </Select>
        {formState['organization_id'].message && <p>{formState['organization_id'].message}</p>}
      </FormControl>
      <div className={'main-btn'}>
      <Button type='submit' variant='contained' >ADD</Button>
      </div>
      </form>
    </div>
  )
}

export default AdminForm;