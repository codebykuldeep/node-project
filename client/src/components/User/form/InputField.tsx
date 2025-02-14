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
  disabled?:boolean;
}

function InputField({label,type,name,value,onChange,formState,disabled}:InputFieldProps) {
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
          disabled={!!disabled}
        />
  )
}

export default InputField