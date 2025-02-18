import React, { useState } from "react";
import { ErrorState } from "../../../types/errorTypes";
import {
  checkValidFormState,
  populateFormState,
  validation,
} from "../../../utils/validationMethods";
import InputField from "./InputField";
import { Button, InputLabel, TextField } from "@mui/material";
import classes from "./payment-form.module.css";
import { IUser } from "../../../types/dataTypes";
import { apiCall } from "../../../utils/httpMethod";
import { useMutation } from "@tanstack/react-query";

const initialformState = {
  amount: {
    status: false,
    message: "",
    value: "",
  },
  image: {
    status: false,
    message: "",
    value: "",
  },
};
interface MutateObj {
  formData: FormData;
}

interface PaymentFormProps {
  date: string;
  handleClose: () => void;
  user: IUser;
}
function PaymentForm({ date, user, handleClose }: PaymentFormProps) {
  const [formState, setFormState] = useState<ErrorState>(initialformState);
  const { isPending, mutateAsync } = useMutation({
    mutationFn: ({ formData }: MutateObj) =>
      apiCall("POST", `transactions/new`, null, formData),
  });
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
      const formData = new FormData(event.target as HTMLFormElement);
      formData.set("user_id", user.user_id);
      formData.set("date", date);
      const response = await mutateAsync({ formData });

      if (Boolean(response.success)) {
        alert("success");
        handleClose();
      } else {
        alert("failed");
      }
    } else {
      setFormState(populateFormState(formState));
      alert("failed");
    }
  }

  function handleImage(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = event.target.value;
    if (event.target.files) {
      if (!event.target.files[0].type.includes("image")) {
        setFormState((prev) => ({
          ...prev,
          [name]: {
            message: "Please select a valid image",
            status: true,
            value: value,
          },
        }));
      } else {
        handleFormChange(event);
      }
    } else {
      handleFormChange(event);
    }
  }

  return (
    <div>
      <div className={classes.heading}>
        <h1>Make Payment</h1>
      </div>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div>
          <TextField
            type="text"
            name="date"
            label="Selected Date"
            defaultValue={date}
            variant="standard"
            disabled
          />
        </div>
        <div>
          <InputField
            type="number"
            name="amount"
            label="amount"
            onChange={handleFormChange}
            formState={formState}
          />
        </div>
        <div>
          <InputLabel id="payment-image">Payment Image</InputLabel>
          <InputField
            type="file"
            name="image"
            label=""
            onChange={handleImage}
            formState={formState}
          />
        </div>
        <div className={classes.btn}>
          <Button
            type="submit"
            variant="contained"
            loading={isPending}
            loadingPosition="end"
          >
            Pay
          </Button>
          <Button
            type="button"
            variant="contained"
            onClick={handleClose}
            disabled={isPending}
          >
            Close
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PaymentForm;
