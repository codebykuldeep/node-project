import React, { useState } from 'react';
import { ErrorState } from '../../../types/errorTypes';
import { checkValidFormState, populateFormState, validation } from '../../../utils/validationMethods';
import InputField from './InputField';
import { Button, InputLabel, TextField } from '@mui/material';
import classes from './payment-form.module.css'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import axios from 'axios';
import { constant } from '../../../helpers/constants';
import { getToken } from '../../../helpers/utilityFns';
import { IUser } from '../../../types/dataTypes';

const initialformState ={
    amount:{
        status:false,
        message:'',
        value:''
    },
    image:{
        status:false,
        message:'',
        value:''
    },
  }

interface PaymentFormProps{
  date:string;
  handleClose:()=>void;
  user:IUser
}
function PaymentForm({date,user,handleClose}:PaymentFormProps) {
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


    async function handleSubmit(event:React.FormEvent<HTMLFormElement>){
      event.preventDefault();
      console.log(formState);
      
      if(checkValidFormState(formState)){
        const formData = new FormData(event.target as HTMLFormElement);
      const body = Object.fromEntries(formData.entries());
      console.log(body);
      const res = await axios.post(
        constant.SERVER + "/transactions/new",
        {
          ...body,
          user_id:user!.id,
          organization_id:user!.organization_id,
          date:date
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: getToken(),
          },
        }
      );
      
      if(Boolean(res.data.data.success)){
        alert('success');
        handleClose();
      }
      else{
        alert('failed');
      }
      }
      else{
        setFormState(populateFormState(formState));
        alert('failed')
      }
    }

    function handleImage(event: React.ChangeEvent<HTMLInputElement>) {
        console.log(event.target.files);
        const name = event.target.name;
        const value = event.target.value;
        if (event.target.files) {
          if (!event.target.files[0].type.includes("image")) {
            setFormState((prev) => ({
              ...prev,
              [name]: {
                message: "Please select a valid image",
                status: true,
                value: value,
              },
            }));
          } else {
            handleFormChange(event);
          }
        } else {
          handleFormChange(event);
        }
      }
    
  return (
    <div >
      <div className={classes.heading} >
        <h1>Make Payment</h1>
      </div>
      <form className={classes.form}  onSubmit={handleSubmit}>
      <div>
      <TextField type='text' name='date' label='Selected Date' defaultValue={date} variant="standard" disabled/>
      </div>
      <div>
      <InputField type='number' name='amount' label='amount' onChange={handleFormChange} formState={formState}/>
      </div>
      <div>
          <InputLabel id="payment-image">Payment Image</InputLabel>
          <InputField
            type="file"
            name="image"
            label=""
            onChange={handleImage}
            formState={formState}
          />
        </div>
      <div className={classes.btn}>
      <Button type='submit' variant='contained'>Pay</Button>
      <Button type='button' variant='contained' onClick={handleClose}>Close</Button>
      </div>
      </form>
    </div>
  )
}

export default PaymentForm