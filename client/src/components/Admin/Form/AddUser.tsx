import React  from 'react'
import InputField from './InputField';
import classes from './form.module.css';
import { Button} from '@mui/material';


function AddUser() {
    
  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <h1>Add a new User</h1>
      </div>
      <form className={classes.form} action="">
      <InputField type='text' name='name' label='Name'/>
      <InputField type='email' name='email' label='Email'/>
      <InputField type='number' name='number' label='Phone Number'/>
      <InputField type='number' name='interest' label='Interest Rate'/>
      <div>
      <Button type='button' variant='contained'>ADD</Button>
      </div>
      </form>
    </div>
  )
}

export default AddUser;