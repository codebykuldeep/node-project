import React, { useEffect, useState } from 'react'
import InputField from './InputField';
import classes from './form.module.css';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { IOrganization, IUser } from '../../../types/dataTypes';
import { getOrganizationData } from '../../../utils/fetchMethods';
import { ErrorState } from '../../../types/errorTypes';
import { checkValidFormState, populateFormState, validation } from '../../../utils/validationMethods';


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




function OrgUpdateForm() {
  const user = useSelector((state:RootState)=>state.userState.user);

  const [formState,setFormState] = useState<ErrorState>( initialformState);

  const [data,setData] = useState<IOrganization | null>(null);
  console.log(data);
  
  useEffect(()=>{
      try {
          getOrganizationData(user!.organization_id)
          .then(data=>{
            setFormState(generateFormState(initialformState,data));
            setData(data);
          });
      } catch (error) {
          console.log(error);
          
      }},
    [user])
      console.log(formState);
      

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

  if(!data){
    return <p>Loading...</p>
  }
  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <h1>Update Organization Details</h1>
      </div>
      <form className={classes.form} onSubmit={handleSubmit}>
      <InputField type='text' name='name' label='Name' value={data.name} onChange={handleFormChange} formState={formState}/>
      <InputField type='text' name='description' label='Description' value={data.description} onChange={handleFormChange} formState={formState}/>
      <InputField type='text' name='payment_id' label='Payment id' value={data.payment_id} onChange={handleFormChange} formState={formState}/>
      <InputField type='file' name='payment_url' label='' onChange={handleFormChange} formState={formState}/>
      <div>
      <Button type='submit' variant='contained'>Update</Button>
      </div>
      </form>
    </div>
  )
}

export default OrgUpdateForm;

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

function generateFormState(initialformState:ErrorState,data:IOrganization){
  const newState = fillFormState<IOrganization>(initialformState,data,'name','description','payment_id');
  return newState;
}