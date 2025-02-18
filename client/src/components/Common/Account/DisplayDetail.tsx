import { FormLabel, Stack, Typography } from '@mui/material';
import React from 'react'

interface Props{
  label:string;
  content:string;
}

function DisplayDetail({label,content}:Props) {
  return (
    <Stack gap={1}>
      <FormLabel htmlFor={label}>{label}</FormLabel>
      <Typography
        >
          {content}
        </Typography>
        
    </Stack>
  )
}

export default DisplayDetail