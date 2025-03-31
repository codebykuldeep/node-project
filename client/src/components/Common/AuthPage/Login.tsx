import React, { useState } from "react";
import Button from '@mui/material/Button';
import classes from "./login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { userActions } from "../../../store/userState";
import { getDashboardPath, setToken } from "../../../helpers/utilityFns";
import { apiCall } from "../../../utils/httpMethod";
import InputField from "../InputField";
import { FormHelperText } from "@mui/material";
import { FormStateType } from "../../../types/formTypes";
import { checkValidFormState, populateFormState, validation } from "../../../utils/validationMethods";

const initialState ={
  email:{
    value:"",
    status:false,
    message:""
  },
  password:{
    value:"",
    status:false,
    message:""
  }
}


function Login() {
    const navigate = useNavigate();
    const [userState, setUserState] = useState<FormStateType>(initialState)
    const [error,setError] = useState('');
    const [submit,setSubmit] = useState(false);
    const dispatch = useDispatch<AppDispatch>()

    function handleChange(event:React.ChangeEvent<HTMLInputElement>){
      const name = event.target.name;
      const [errorMessage,status] = validation(name,event.target.value)
      setUserState((prev)=>({
        ...prev,
        [name]:{
          value:event.target.value,
          status:status,
          message:errorMessage
        }
      }))
    }

    async function handleSubmit(event:React.FormEvent<HTMLFormElement | HTMLTextAreaElement>){
        event.preventDefault();
        if(!checkValidFormState(userState)){
          setUserState(prev=>populateFormState(prev));
          return;
        }
        setSubmit(true);
        const body ={
          email:userState.email.value,
          password:userState.password.value,
        }
         const data = await apiCall('POST','login',undefined,body);
         if(data.token){
          setToken(data.token);
          const user = data.data;
          dispatch(userActions.setUser({user}));
          navigate('/dashboard/'+getDashboardPath(user));
         }
         else{
          setError(data.data.message)
         }
         setSubmit(false);
    }




  return (
    <form className={classes.form} onSubmit={handleSubmit}>
        <div>
            <h1>Grow More 📈</h1>
        </div>
        <InputField type="text" label="Email" name="email" formState={userState}  onChange={handleChange}>Enter your email</InputField>
        <InputField type="password" label="Password" name="password" formState={userState}  onChange={handleChange}>Enter your password</InputField>
        {
          error && <FormHelperText error sx={{fontSize:'1rem'}}>{error}</FormHelperText>
        }
        <div className={'main-btn'}>
          <Button  type="submit" variant="contained" loading={submit} loadingPosition="end">
            Login
          </Button>
        </div>
        <div>
        <Link to={'/reset-password'}><Button>Forget Password</Button></Link>
        </div>
      </form>
  );
}

export default Login;
