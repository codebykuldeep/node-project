import React from "react";
import InputField from "./InputField";
import classes from "./form.module.css";
import { Button, InputLabel } from "@mui/material";
import { IOrganization } from "../../../types/dataTypes";
import {
  checkValidFormState,
  populateFormState
} from "../../../utils/validationMethods";
import { useMutation } from "@tanstack/react-query";
import { apiCall } from "../../../utils/httpMethod";
import ShowSnackbar from "../../Common/UI/ShowSnackbar";
import useSnack from "../../../helpers/useSnack";
import { generateFormState } from "../../../utils/formMethods";
import useForm from "../../../helpers/useForm";

interface Props{
  organization:IOrganization
}

function OrgUpdateForm({organization}:Props) {
  const {formState,setFormState,handleFormChange,handleImage} = useForm(generateFormState<IOrganization>(organization,formFields));
  const {snackState,snackOpen,snackClose} =useSnack();
  const {mutateAsync,isPending} =useMutation({
    mutationFn:(body:unknown)=>apiCall('POST','organization/update',null,body),
    mutationKey:['organization','detail']
  })
  
  
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(formState);

    if (checkValidFormState(formState)) {
      const formData = new FormData(event.target as HTMLFormElement);
      formData.append('id',organization.organization_id);
      
      const response = await mutateAsync(formData);
      if(response.success){
        snackOpen(true,"success",'updated successfully',);
      }
      else{
        snackOpen(true,"error",'update failed');
      }
    } else {
      setFormState(populateFormState(formState));
    }
  }

  console.log(formState);
  
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
          value={formState.name.value}
          onChange={handleFormChange}
          formState={formState}
        />
        <InputField
          type="text"
          name="description"
          label="Description"
          value={formState.description.value}
          onChange={handleFormChange}
          formState={formState}
        />
        <InputField
          type="text"
          name="payment_id"
          label="Payment id"
          value={formState.payment_id.value}
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
          <Button type="submit" variant="contained" loading={isPending} loadingPosition="end">
            Update
          </Button>
        </div>
      </form>
      <ShowSnackbar state={snackState} closeFn={snackClose}/>
    </div>
  );
}

export default OrgUpdateForm;


const formFields =['name','description','payment_id','payment_url'];
