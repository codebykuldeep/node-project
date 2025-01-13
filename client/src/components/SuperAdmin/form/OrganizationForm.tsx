import React from 'react'
import InputField from './InputField';
import classes from './form.module.css';
import { Button } from '@mui/material';

function OrganizationForm() {
  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <h1>Add a new Organization</h1>
      </div>
      <form className={classes.form} action="">
      <InputField type='text' name='name' label='Name'/>
      <InputField type='text' name='description' label='Description'/>
      <InputField type='text' name='payment_id' label='Payment id'/>
      <InputField type='file' name='payment_url' label='Payment image'/>
      <div>
      <Button type='button' variant='contained'>ADD</Button>
      </div>
      </form>
    </div>
  )
}

export default OrganizationForm