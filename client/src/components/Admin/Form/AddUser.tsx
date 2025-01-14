import React, { useState }  from 'react'
import InputField from './InputField';
import classes from './form.module.css';
import { Button} from '@mui/material';
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
  interest:{
      status:false,
      message:'',
      value:''
  },
}


function AddUser() {
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