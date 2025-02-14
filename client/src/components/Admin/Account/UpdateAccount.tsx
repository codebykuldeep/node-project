import React, { useState } from 'react'
import InputField from '../Form/InputField';
import classes from '../Form/form.module.css';
import { Button } from '@mui/material';
import { IOrganization, IUser } from '../../../types/dataTypes';
import { ErrorState } from '../../../types/errorTypes';
import { checkValidFormState, populateFormState, validation } from '../../../utils/validationMethods';
import { getToken } from '../../../helpers/utilityFns';
import axios from 'axios';
import { constant } from '../../../helpers/constants';

interface Props{
    user:IUser;
}

function UpdateAccount({user}:Props) {
  const [formState,setFormState] = useState<ErrorState>( generateFormState({},user));
  function handleFormChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = event.target.value;

    const [msg, status] = validation(name, value);
    setFormState((prev) => ({
      ...prev,
      [name]: {
        message: msg,
        status: status,
        value: value,
      },
    }));
  }
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(formState);

    if (checkValidFormState(formState)) {
      const formData = new FormData(event.target as HTMLFormElement );
      const body = Object.fromEntries(formData.entries());
  
      
      const {data} = await axios.post(constant.SERVER+'/user/update',{
        ...body,
        role:user.role
      },{
        headers: {
          'Content-Type': 'application/json',
          'Authorization':getToken()
        },
      })
      
      alert(data.data.success)
      setFormState(generateFormState({},user));
    } else {
      setFormState(populateFormState(formState));
      alert("failed");
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <h1>Update Your Details</h1>
      </div>
      <form className={classes.form} onSubmit={handleSubmit}>
      <InputField type='text' name='name' label='Name' value={user.name} onChange={handleFormChange} formState={formState}/>
      <InputField type='text' name='email' label='Email' value={user.email} onChange={handleFormChange} formState={formState}/>
      <InputField type='number' name='number' label='Phone number' value={user.number} onChange={handleFormChange} formState={formState}/>
      <div>
      <Button type='submit' variant='contained'>Update</Button>
      </div>
      </form>
    </div>
  )
}

export default UpdateAccount;


function fillFormState<T extends IOrganization | IUser>(initialformState:ErrorState,data:T,...property:string[]){
  for(let i= 0;i<property.length;i++){
    const [msg,status] = validation(property[i],data[property[i]]);
    initialformState ={
      ...initialformState,
      [property[i]]:{
        message:msg,
        status:status,
        value:data[property[i]]
      }
    }
  }
 return initialformState;
  
}

function generateFormState(initialformState:ErrorState,data:IUser){
  const newState = fillFormState<IUser>(initialformState,data,'name','email','number');
  return newState;
}