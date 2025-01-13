import { TextField } from '@mui/material'
import React from 'react'

interface InputFieldProps{
  label:string;
  type:string;
  name:string;
}

function InputField({label,type,name}:InputFieldProps) {
  return (
    <TextField
          id={type}
          label={label}
          type={type}
          name={name}
          variant="standard"
        />
  )
}

export default InputField