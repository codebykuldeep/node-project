import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import classes from "./login.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RawAxiosRequestHeaders ,AxiosRequestConfig} from "axios";
import { env } from "../../helpers/constants";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { userActions } from "../../store/userState";
import { getDashboardPath } from "../../helpers/utilityFns";


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
        const config: AxiosRequestConfig = {
          headers: {
            'Content-Type': 'application/json',
          } as RawAxiosRequestHeaders,
        };
        const body ={
          email:userState.email.value,
          password:userState.password.value,
        }
         const {data} = await axios.post<any>(env.SERVER+'/user/login',body,config)
         if(data.token){
          localStorage.setItem('token',data.token);
          
          const user = data.data.user;
          dispatch(userActions.setUser({user}));
          navigate('/dashboard/'+getDashboardPath(user));
         }
    }




  return (
    <div  className={classes.container}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div>
            <h1>Grow More 📈</h1>
        </div>
        <div>
          <TextField
            id="email"
            label="Email"
            name="email"
            type="text"
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            id="password"
            label="Password"
            name="password"
            type="password"
            onChange={handleChange}
          />
        </div>
        <div>
          <Button type="submit" variant="contained">Login</Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
