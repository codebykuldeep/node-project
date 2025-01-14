import { TextField } from '@mui/material'
import React from 'react'
import { ErrorState } from '../../../types/errorTypes';

interface InputFieldProps{
  label:string;
  type:string;
  name:string;
  value?:string;
  onChange?:(event:React.ChangeEvent<HTMLInputElement>)=>void;
  formState?:ErrorState;
}

function InputField({label,type,name,value,onChange,formState}:InputFieldProps) {
  return (
    <TextField
          id={type}
          label={label}
          type={type}
          name={name}
          defaultValue={value || ""}
          variant="standard"
          onChange={onChange}
          error={formState![name].status}
          helperText={formState![name].message}
        />
  )
}

export default InputField