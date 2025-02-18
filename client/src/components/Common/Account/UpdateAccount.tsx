import React, { useState } from 'react'
import InputField from '../InputField';
import classes from './form.module.css';
import { Button, Stack } from '@mui/material';
import { IOrganization, IUser } from '../../../types/dataTypes';
import { ErrorState, SnackType } from '../../../types/errorTypes';
import { checkValidFormState, populateFormState, validation } from '../../../utils/validationMethods';
import { apiCall } from '../../../utils/httpMethod';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import DisplayDetail from './DisplayDetail';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { updateUser } from '../../../store/userState';
import ShowSnackbar from '../UI/ShowSnackbar';

interface Props{
    user:IUser;
}

function UpdateAccount({user}:Props) {
  const [snackState,setSnackState]=useState<SnackType>({open:false,status: undefined,message:''})
  const dispatch = useDispatch<AppDispatch>();
  const [edit,setEdit] =useState(false);
  const [formState,setFormState] = useState<ErrorState>( generateFormState({},user));
  const {isPending,mutateAsync} = useMutation({
    mutationFn:(body:unknown) => apiCall('POST','user/update',null,body)
  })
  function snackClose(){
    setSnackState({open:false,status:undefined,message:''});
  }
  
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
      const body ={
        name:formState.name.value,
        email:formState.email.value,
        number:formState.number.value,
      }
      const response = await mutateAsync(body)
      
      if(response.success){
        setSnackState({open:true,status:'success',message:response.data.message});
        setEdit(false);
        dispatch(updateUser());
      }
      else{
        setSnackState({open:true,status:'error',message:response.data.message});
      }
    } else {
      setFormState(populateFormState(formState));
    }
  }

  function handleEdit(){
    setEdit(prev => !prev);
  }

  return (
    <div className={classes.container}>
      
      <form className={classes.form} onSubmit={handleSubmit}>
      <Stack className={classes.heading}>
        <h1>Update Your Details</h1>
        <div>
        {!edit && <Button size='small' type='button' color='warning' startIcon={<EditIcon/>} onClick={handleEdit} variant='contained'>Edit</Button>}
        {edit && <Stack direction={'row'} gap={0.5}>
          <Button size='small' type='button' color='error' startIcon={<CloseIcon/>} onClick={handleEdit} variant='contained' disabled={isPending}>
            Cancel
          </Button>
          <Button size='small' type='submit' variant='contained' loading={isPending} loadingPosition='end'>
            Update
          </Button>
        </Stack>}
      </div>
      </Stack>
      
      { edit ?
        <>
        
        <InputField type='text' name='name' label='Name' onChange={handleFormChange} formState={formState}/>
        <InputField type='text' name='email' label='Email'  onChange={handleFormChange} formState={formState}/>
        <InputField type='number' name='number' label='Phone number' onChange={handleFormChange} formState={formState}/>
      
        </> :
        <>
        <DisplayDetail label='Name' content={user.name}/>
        <DisplayDetail label='Email' content={user.email}/>
        <DisplayDetail label='Phone Number' content={user.number}/>
        </>
      }
      </form>
      <ShowSnackbar state={snackState} closeFn={snackClose}/>
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