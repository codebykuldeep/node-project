import React from 'react'
import classes from './withdraw.module.css'
import { Button, TextField } from '@mui/material'

function WithdrawPage() {
  return (
    <div className={classes.container}>
      <div className={classes.detail}>
        <div>Available Amount</div>
        <div><span>$</span><span>3000</span></div>
      </div>
      <div className={classes.form_box}>
        <div className={classes.heading}>
          <h1>Withdrawal Request</h1>
        </div>
        <div className={classes.form}>
          <form action="">
          <TextField
          id="amount"
          name='amount'
          label="Amount"
          type='number'
          defaultValue="0"
          variant="filled"
        />
        <div>
          <Button variant='contained'>Request Withdrawal</Button>
        </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default WithdrawPage