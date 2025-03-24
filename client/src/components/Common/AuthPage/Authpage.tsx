import React from "react";
import classes from "./login.module.css";
import AuthImg from '../../../assets/auth-img.png'
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import { useLocation } from "react-router-dom";
import ResetForgetPassword from "./ResetForgetPassword";



function AuthPage() {
    const location = useLocation();
    
  return (
    <div  className={classes.container}>
      <div className={classes.image}>
        <img src={AuthImg} alt="login img"/>
      </div>
      <div className={classes.form_container}>
      {location.pathname === '/reset' && <ResetForgetPassword/> }
      {(location.pathname === '/' || location.pathname === '/login') && <Login />}
      {location.pathname === '/reset-password' && <ForgotPassword />}
      </div>
    </div>
  );
}

export default AuthPage;
