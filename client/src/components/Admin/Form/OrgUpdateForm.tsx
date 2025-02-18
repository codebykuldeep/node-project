import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import classes from "./form.module.css";
import { Button, InputLabel } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { IOrganization, IUser } from "../../../types/dataTypes";
import { getOrganizationData } from "../../../utils/fetchMethods";
import { ErrorState } from "../../../types/errorTypes";
import {
  checkValidFormState,
  populateFormState,
  validation,
} from "../../../utils/validationMethods";
import { getToken } from "../../../helpers/utilityFns";
import axios from "axios";
import { constant } from "../../../helpers/constants";
import { useFetch } from "../../../helpers/useFetch";



function OrgUpdateForm() {
  const user = useSelector((state: RootState) => state.userState.user);

  const [formState, setFormState] = useState<ErrorState>(initialformState);

  const [fetchedData,loading,error] = useFetch<IOrganization>('/organization/'+ user!.organization_id)
      
  let data: IOrganization;
  if (!error) {
    data = fetchedData as IOrganization;
  } else {
    return <p>Error while loading page</p>;
  }


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
      const body = Object.fromEntries(formData.entries());
      console.log(body);
      const res = await axios.post(
        constant.SERVER + "/organization/update",
        {
          ...body,
          id:data!.id,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: getToken(),
          },
        }
      );
      alert(res);
    } else {
      setFormState(populateFormState(formState));
      alert("failed");
    }
  }

  function handleImage(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.files);
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

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <h1>Update Organization Details</h1>
      </div>
      <form className={classes.form} onSubmit={handleSubmit}>
        <InputField
          type="text"
          name="name"
          label="Name"
          value={data.name}
          onChange={handleFormChange}
          formState={formState}
        />
        <InputField
          type="text"
          name="description"
          label="Description"
          value={data.description}
          onChange={handleFormChange}
          formState={formState}
        />
        <InputField
          type="text"
          name="payment_id"
          label="Payment id"
          value={data.payment_id}
          onChange={handleFormChange}
          formState={formState}
        />
        <div>
          <InputLabel id="payment-image">Payment Image</InputLabel>
          <InputField
            type="file"
            name="payment_url"
            label=""
            onChange={handleImage}
            formState={formState}
          />
        </div>
        <div>
          <Button type="submit" variant="contained">
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}

export default OrgUpdateForm;

function fillFormState<T extends IOrganization | IUser>(
  initialformState: ErrorState,
  data: T,
  ...property: string[]
) {
  for (let i = 0; i < property.length; i++) {
    const [msg, status] = validation(property[i], data[property[i]]);
    initialformState = {
      ...initialformState,
      [property[i]]: {
        message: msg,
        status: status,
        value: data[property[i]],
      },
    };
  }
  return initialformState;
}

function generateFormState(initialformState: ErrorState, data: IOrganization) {
  const newState = fillFormState<IOrganization>(
    initialformState,
    data,
    "name",
    "description",
    "payment_id"
  );
  return newState;
}




const initialformState = {
  name: {
    status: false,
    message: "",
    value: "",
  },
  description: {
    status: false,
    message: "",
    value: "",
  },
  payment_id: {
    status: false,
    message: "",
    value: "",
  },
  payment_url: {
    status: false,
    message: "",
    value: "",
  },
};