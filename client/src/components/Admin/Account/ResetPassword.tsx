import React, { useState } from 'react'
import InputField from '../Form/InputField';
import { Button } from '@mui/material';
import classes from './reset-password.module.css'
import { checkValidFormState, populateFormState, validation } from '../../../utils/validationMethods';
import { ErrorState } from '../../../types/errorTypes';


const initialformState ={
    password:{
        status:false,
        message:'',
        value:''
    },
    old_password:{
        status:false,
        message:'',
        value:''
    },
  }

function ResetPassword() {
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
      <h1>Update Your Password</h1>
    </div>
    <form className={classes.form} onSubmit={handleSubmit}>
        <InputField label='Old Password' type='text' name='old_password' onChange={handleFormChange} formState={formState}/>
        <InputField label='Password' type='text' name='password' onChange={handleFormChange} formState={formState}/>
    <div>
    <Button type='submit' variant='contained'>Update</Button>
    </div>
    </form>
  </div>
  )
}

export default ResetPassword


/*

<div className={classes.reset}>
        <div>
            <h1>Reset Password</h1>
        </div>
        <div className={classes.form_box}>
            <form action="">
                <div>
                    <InputField label='Old Password' type='text' name='old_password'/>
                </div>
                <div>
                    <InputField label='Password' type='text' name='password'/>
                </div>
                <div>
                    <Button type='button'>Update</Button>
                </div>
            </form>
        </div>
    </div>

*/