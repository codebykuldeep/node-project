import React, { useEffect, useState } from 'react'
import InputField from './InputField';
import classes from './form.module.css';
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { IOrganization } from '../../../types/dataTypes';
import { getToken } from '../../../helpers/utilityFns';
import axios from 'axios';
import { env } from '../../../helpers/constants';
import { ErrorState } from '../../../types/errorTypes';
import { checkValidFormState, populateFormState, validation } from '../../../utils/validationMethods';

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
    const [organizations,setOrganizations] = useState<IOrganization[] | null>(null);
    const [formState,setFormState] = useState<ErrorState>(initialformState);
    useEffect(()=>{
        async function getData() {
            const {data} = await axios.get(env.SERVER +'/organization',{
                headers:{
                    'Authorization':getToken(),
                }
            })
            setOrganizations(data.data.organizations)
            console.log(data.data);
            
        }
        try {
            getData();
        } catch (error) {
            console.log(error);
            
        }
    },[])


   
    
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
      function handleSubmit(event:React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        console.log(formState);
        
        if(checkValidFormState(formState)){
          alert('succces')
        }
        else{
          setFormState(populateFormState(formState));
          alert('failed')
        }
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
          {
            organizations?.map((organization,index)=>(
                <MenuItem key={index} value={organization.id}>{organization.name}</MenuItem>
            ))
          }
        </Select>
        {formState['organization_id'].message && <p>{formState['organization_id'].message}</p>}
      </FormControl>
      <div>
      <Button type='submit' variant='contained'>ADD</Button>
      </div>
      </form>
    </div>
  )
}

export default AdminForm;