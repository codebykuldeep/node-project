import React, { useState } from 'react'
import InputField from './InputField';
import classes from './form.module.css';
import { Button, InputLabel } from '@mui/material';
import { checkValidFormState, populateFormState, validation } from '../../../utils/validationMethods';
import { ErrorState } from '../../../types/errorTypes';
import { env } from '../../../helpers/constants';
import { getToken } from '../../../helpers/utilityFns';
import axios from 'axios';

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
  const [submit,setSubmit] = useState(false);

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
  async function handleSubmit(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    console.log(formState);
    setSubmit(true);
    if(checkValidFormState(formState)){
      
      const formData = new FormData(event.target as HTMLFormElement );
      const body = Object.fromEntries(formData.entries());
      const {data} = await axios.post(env.SERVER+'/organization/register',body,{
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization':getToken()
        }
      })
      alert(data.data.success)
      setFormState(initialformState);
      (event.target as HTMLFormElement).reset();
    }
    else{
      setFormState(populateFormState(formState));
    }
    setSubmit(false);
  }

  function handleImage(event:React.ChangeEvent<HTMLInputElement>){
    console.log(event.target.files)
    const name = event.target.name;
    const value = event.target.value;
    if(event.target.files){
      if(!event.target.files[0].type.includes('image')){
        setFormState((prev)=>({
          ...prev,
          [name]:{
            message:'Please select a valid image',
            status:true,
            value:value
          }
        }))
      }
      else{
        handleFormChange(event);
      }
    }
    else{
      handleFormChange(event);
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
      <InputLabel id="payment-image">Payment Image</InputLabel>
      <InputField  type='file' name='payment_url' label='' onChange={handleImage} formState={formState} />
      </div>
      <div>
      <Button type='submit' variant='contained' disabled={submit}>ADD</Button>
      </div>
      </form>
    </div>
  )
}

export default OrganizationForm