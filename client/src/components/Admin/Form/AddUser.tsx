import React, { useState }  from 'react'
import InputField from './InputField';
import classes from './form.module.css';
import { Button} from '@mui/material';
import { ErrorState } from '../../../types/errorTypes';
import { checkValidFormState, populateFormState, validation } from '../../../utils/validationMethods';
import { getToken } from '../../../helpers/utilityFns';
import { constant } from '../../../helpers/constants';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useMutation } from '@tanstack/react-query';
import { apiCall } from '../../../utils/httpMethod';
import useSnack from '../../../helpers/useSnack';
import ShowSnackbar from '../../Common/UI/ShowSnackbar';

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
  const {mutateAsync,isPending} = useMutation({
    mutationFn:(body:unknown)=>apiCall('POST','user/register',null,body)
  })
  const {snackState,snackClose,snackOpen} =useSnack();
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
      const response = await mutateAsync({
        ...body,
        organization_id:user!.organization_id
      })
      if(response.success){
        snackOpen(true,'success','User added successful')
      }
      else{
        snackOpen(false,'error','Failed to perform operation')
      }
      
      }
      else{
        setFormState(populateFormState(formState));
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
      <Button type='submit' variant='contained' loading={isPending} loadingPosition='end'>ADD</Button>
      </div>
      </form>
      <ShowSnackbar state={snackState} closeFn={snackClose}/>
    </div>
  )
}

export default AddUser;