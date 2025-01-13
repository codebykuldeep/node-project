import { TextField } from '@mui/material'
import React from 'react'

interface InputFieldProps{
  label:string;
  type:string;
  name:string;
  value?:string;
}

function InputField({label,type,name,value}:InputFieldProps) {
  return (
    <TextField
          id={type}
          label={label}
          type={type}
          name={name}
          defaultValue={value || ""}
          variant="standard"
        />
  )
}

export default InputField