import React, { useState } from "react";
import InputField from "../InputField";
import { Alert, Box, Button, InputAdornment } from "@mui/material";
import classes from "./form.module.css";
import {
  checkValidFormState,
  populateFormState,
  validation,
} from "../../../utils/validationMethods";
import { ErrorState } from "../../../types/errorTypes";

import VisibilityIcon from "@mui/icons-material/Visibility";
import useSnack from "../../../helpers/useSnack";
import ShowSnackbar from "../UI/ShowSnackbar";
import { useMutation } from "@tanstack/react-query";
import { apiCall } from "../../../utils/httpMethod";

const initialformState = {
  password: {
    status: false,
    message: "",
    value: "",
  },
  confirm_password: {
    status: false,
    message: "",
    value: "",
  },
  old_password: {
    status: false,
    message: "",
    value: "",
  },
};

function ResetPassword() {
  const [formState, setFormState] = useState<ErrorState>(initialformState);
  const { snackState, snackOpen, snackClose } = useSnack();
  const {isPending,mutateAsync} = useMutation({
    mutationFn:(body:unknown)=>apiCall('POST','update-password',null,body),
  })

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

    if (checkValidFormState(formState)) {
      if (formState.password.value !== formState.confirm_password.value) {
        snackOpen(true, "warning", "Password mismatch ,Please recheck");
      } else {
        const body = {
          password: formState.password.value,
          old_password: formState.old_password.value,
        };
        const response = await mutateAsync(body);
        if(response.success){
          snackOpen(true, "success", response.data.message);
        }
        else{
          snackOpen(true, "error", response.data.message);
        }
      }
    } else {
      setFormState(populateFormState(formState));
    }
  }
  console.log(formState);
  
  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.heading}>
          <h1>Update Your Password</h1>
        </div>
        <InputField
          label="Old Password"
          type="text"
          name="old_password"
          onChange={handleFormChange}
          formState={formState}
        />
        <InputField
          label="Password"
          type="text"
          name="password"
          onChange={handleFormChange}
          formState={formState}
        />
        <InputField
          label="Confirm Password"
          type="text"
          name="confirm_password"
          onChange={handleFormChange}
          formState={formState}
        />
        <Box>
        {snackState.open && <Alert severity={snackState.status}>{snackState.message}</Alert>}
        </Box>
        <Box>
          <Button type="submit" variant="contained" loading={isPending} loadingPosition="end">
            Update
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default ResetPassword;

/*

<div className={classes.reset}>
        <div>
            <h1>Reset Password</h1>
        </div>
        <div className={classes.form_box}>
            <form action="">
                <div>
                    <InputField label='Old Password' type='text' name='old_password'/>
                </div>
                <div>
                    <InputField label='Password' type='text' name='password'/>
                </div>
                <div>
                    <Button type='button'>Update</Button>
                </div>
            </form>
        </div>
    </div>

*/
