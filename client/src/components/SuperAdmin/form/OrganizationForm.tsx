import React, { ChangeEvent, useState } from 'react'
import InputField from './InputField';
import classes from './form.module.css';
import { Button, InputLabel } from '@mui/material';
import { checkValidFormState, populateFormState, validation } from '../../../utils/validationMethods';
import { ErrorState } from '../../../types/errorTypes';

const initialformState ={
  name:{
      status:false,
      message:'',
      value:''
  },
  description:{
      status:false,
      message:'',
      value:''
  },
  payment_id:{
      status:false,
      message:'',
      value:''
  },
  payment_url:{
      status:false,
      message:'',
      value:''
  },
}

function OrganizationForm() {
  const [formState,setFormState] = useState<ErrorState>(initialformState);

  function handleFormChange(event:React.ChangeEvent<HTMLInputElement>){
    
    
    const name = event.target.name;
    const value = event.target.value;

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
        <h1>Add a new Organization</h1>
      </div>
      <form className={classes.form} onSubmit={handleSubmit}>
      <InputField type='text' name='name' label='Name' onChange={handleFormChange} formState={formState}/>
      <InputField type='text' name='description' label='Description' onChange={handleFormChange} formState={formState}/>
      <InputField type='text' name='payment_id' label='Payment id' onChange={handleFormChange} formState={formState}/>
      <div>
      <InputLabel id="demo-simple-select-label">Payment Image</InputLabel>
      <InputField type='file' name='payment_url' label='' onChange={handleFormChange} formState={formState} />
      </div>
      <div>
      <Button type='submit' variant='contained'>ADD</Button>
      </div>
      </form>
    </div>
  )
}

export default OrganizationForm