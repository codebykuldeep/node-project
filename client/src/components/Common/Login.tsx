import React from "react";
import { Button, TextField } from "@mui/material";
import classes from "./login.module.css";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    function handleSubmit(event:React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        navigate('/dashboard/user');
    }
  return (
    <div  className={classes.container}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div>
            <h1>Grow More 📈</h1>
        </div>
        <div>
          <TextField
            id="outlined-password-input"
            label="Email"
            name="email"
            type="text"
          />
        </div>
        <div>
          <TextField
            id="outlined-password-input"
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
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
