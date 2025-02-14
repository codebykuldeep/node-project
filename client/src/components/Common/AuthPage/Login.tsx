import React, { useState } from "react";
import Button from '@mui/material/Button';
import classes from "./login.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { userActions } from "../../../store/userState";
import { getDashboardPath, setToken } from "../../../helpers/utilityFns";
import { apiCall } from "../../../utils/httpMethod";
import AuthImg from '../../../assets/auth-img.png'
import InputField from "../InputField";

interface IState{
  email:{
    value:string,
    valid:boolean,
    error:string
  };
  password:{
    value:string,
    valid:boolean,
    error:string
  };
}

const initialState ={
  email:{
    value:"",
    valid:true,
    error:""
  },
  password:{
    value:"",
    valid:true,
    error:""
  }
}


function Login() {
    const navigate = useNavigate();
    const [userState, setUserState] = useState<IState>(initialState)
    const [submit,setSubmit] = useState(false);
    const dispatch = useDispatch<AppDispatch>()

    function handleChange(event:React.ChangeEvent<HTMLInputElement>){
      const name = event.target.name as keyof IState;
      setUserState((prev)=>({
        ...prev,
        [name]:{
          value:event.target.value,
          valid:prev[name].valid,
          error:prev[name].error
        }
      }))
    }

    async function handleSubmit(event:React.FormEvent<HTMLFormElement | HTMLTextAreaElement>){
        event.preventDefault();
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
         setSubmit(false);
    }




  return (
    <div  className={classes.container}>
      <div className={classes.image}>
        <img src={AuthImg} alt="login img"/>
      </div>
      <div className={classes.form_container}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div>
            <h1>Grow More 📈</h1>
        </div>
        <InputField type="text" label="Email" name="email" formState={{}}  onChange={handleChange}>Enter your email</InputField>
        <InputField type="password" label="Password" name="password" formState={{}}  onChange={handleChange}>Enter your password</InputField>
        <div className={'main-btn'}>
          <Button  type="submit" variant="contained" loading={submit} loadingPosition="end">
            Login
          </Button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default Login;
