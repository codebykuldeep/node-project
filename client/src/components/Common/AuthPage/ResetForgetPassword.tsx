import React, { useState } from "react";
import Button from "@mui/material/Button";
import classes from "./login.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import InputField from "../InputField";
import { FormHelperText, IconButton, InputAdornment } from "@mui/material";
import { FormStateType } from "../../../types/formTypes";
import {
  checkValidFormState,
  populateFormState,
  validation,
} from "../../../utils/validationMethods";
import { apiCall } from "../../../utils/httpMethod";
import ShowSnackbar from "../UI/ShowSnackbar";
import useSnack from "../../../helpers/useSnack";
import { Visibility, VisibilityOff } from "@mui/icons-material";



const initialState = {
  password: {
    value: "",
    status: false,
    message: "",
  },
  confirm_password: {
    value: "",
    status: false,
    message: "",
  },
};

function ResetForgetPassword() {
  const { snackState, snackOpen, snackClose } = useSnack();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [userState, setUserState] = useState<FormStateType>(initialState);
  const [error, setError] = useState("");
  const [submit, setSubmit] = useState(false);

  const token = searchParams.get("v");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (error) setError("");
    const name = event.target.name;
    const [errorMessage, status] = validation("password", event.target.value);
    setUserState((prev) => ({
      ...prev,
      [name]: {
        value: event.target.value,
        status: status,
        message: errorMessage,
      },
    }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement | HTMLTextAreaElement>
  ) {
    event.preventDefault();
    if (!checkValidFormState(userState)) {
      setUserState((prev) => populateFormState(prev));
      return;
    }
    if (userState.password.value !== userState.confirm_password.value) {
      setError("Both password didnot match");
      return;
    }
    setSubmit(true);
    const body = {
      token: token,
      password: userState.password.value,
    };
    const response = await apiCall("POST", "forget-password", null, body);
    if (response.success) {
      snackOpen(true, "success", "Password reset successful");
      setTimeout(() => {
        navigate("/");
      }, 1000);
      setUserState(initialState);
    } else {
      snackOpen(true, "error", response.data.message);
    }
    setSubmit(false);
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div>
        <h1>Grow More 📈</h1>
      </div>
      <div>
        <p>Please enter your new password</p>
      </div>
      <InputField
        type="password"
        label="New Passowrd"
        name="password"
        formState={userState}
        onChange={handleChange}
        // InputProps={{
        //   
        //   endAdornment: (
        //     <InputAdornment position="end">
        //       <IconButton
        //         aria-label="toggle password visibility"
        //         onClick={handleClickShowPassword}
        //         onMouseDown={handleMouseDownPassword}
        //       >
        //         {showPassword ? <Visibility /> : <VisibilityOff />}
        //       </IconButton>
        //     </InputAdornment>
        //   ),
        // }}
      >
        New Password
      </InputField>
      <InputField
        type="password"
        label="Confirm Password"
        name="confirm_password"
        formState={userState}
        onChange={handleChange}
      >
        Confirm Password
      </InputField>
      {error && (
        <FormHelperText error sx={{ fontSize: "1rem" }}>
          {error}
        </FormHelperText>
      )}
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
      <ShowSnackbar state={snackState} closeFn={snackClose} />
    </form>
  );
}

export default ResetForgetPassword;
