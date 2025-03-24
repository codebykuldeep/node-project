import React, { useState } from "react";
import classes from "./login.module.css";
import { Button, FormHelperText } from "@mui/material";
import InputField from "../InputField";
import { checkValidFormState, populateFormState, validation } from "../../../utils/validationMethods";
import { FormStateType } from "../../../types/formTypes";
import { apiCall } from "../../../utils/httpMethod";
import useSnack from "../../../helpers/useSnack";
import ShowSnackbar from "../UI/ShowSnackbar";
import { Link } from "react-router-dom";

const initialState = {
  email: {
    value: "",
    status: false,
    message: "",
  },
};

function ForgotPassword() {
  const {snackState,snackOpen,snackClose} = useSnack();
  const [userState, setUserState] = useState<FormStateType>(initialState);
  const [error, setError] = useState("");
  const [submit, setSubmit] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if(error) setError('');
    const name = event.target.name;
    const [errorMessage, status] = validation(name, event.target.value);
    setUserState((prev) => ({
      ...prev,
      [name]: {
        value: event.target.value,
        status: status,
        message: errorMessage,
      },
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement | HTMLTextAreaElement>) {
    event.preventDefault();
    if (!checkValidFormState(userState)) {
      setUserState((prev) => populateFormState(prev));
      return;
    }
    setSubmit(true);
    const body = {
      email: userState.email.value
    };
    const response = await apiCall("POST", "forget-password", undefined, body);
    if(response.success){
      snackOpen(true,'success','Password reset link sent on mail')
      setUserState(initialState);
    }
    else{
      setError(response.data.message);
    }
    
    
    setSubmit(false);
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div>
        <h1>Grow More 📈</h1>
      </div>
      <InputField
        type="text"
        label="Email"
        name="email"
        formState={userState}
        onChange={handleChange}
      >
        Enter your email
      </InputField>
      {
          error && <FormHelperText error sx={{fontSize:'1rem'}}>{error}</FormHelperText>
      }
      <div className={"main-btn"}>
        <Button
          type="submit"
          variant="contained"
          loading={submit}
          loadingPosition="end"
        >
          Reset
        </Button>
      </div>
      <div>
        <Link to={'/login'}><Button>Login here</Button></Link>
      </div>
      <ShowSnackbar state={snackState} closeFn={snackClose}/>
    </form>
  );
}

export default ForgotPassword;
