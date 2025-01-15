import React, { useState }  from 'react'
import InputField from './InputField';
import classes from './form.module.css';
import { Button} from '@mui/material';
import { ErrorState } from '../../../types/errorTypes';
import { checkValidFormState, populateFormState, validation } from '../../../utils/validationMethods';
import { getToken } from '../../../helpers/utilityFns';
import { env } from '../../../helpers/constants';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

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
  interest:{
      status:false,
      message:'',
      value:''
  },
}


function AddUser() {
  const user = useSelector((state:RootState)=>state.userState.user)
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
        env.SERVER + "/user/register",
        {
          ...body,
          organization_id:user!.organization_id
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: getToken(),
          },
        }
      );
      alert('success');
      }
      else{
        setFormState(populateFormState(formState));
        alert('failed')
      }
    }
    
  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <h1>Add a new User</h1>
      </div>
      <form className={classes.form} onSubmit={handleSubmit}>
      <InputField type='text' name='name' label='Name' onChange={handleFormChange} formState={formState}/>
      <InputField type='text' name='email' label='Email' onChange={handleFormChange} formState={formState}/>
      <InputField type='number' name='number' label='Phone Number' onChange={handleFormChange} formState={formState}/>
      <InputField type='number' name='interest' label='Interest Rate' onChange={handleFormChange} formState={formState}/>
      <div>
      <Button type='submit' variant='contained'>ADD</Button>
      </div>
      </form>
    </div>
  )
}

export default AddUser;