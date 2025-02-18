import React, { FormEvent, useState } from 'react'
import classes from './withdraw.module.css'
import { Button, TextField } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { useMutation } from '@tanstack/react-query'
import { apiCall } from '../../../utils/httpMethod'

function WithdrawPage() {
  const user = useSelector((state:RootState)=>state.userState.user)
  const [error,setError] =useState(false);
  const [amount,setAmount] = useState(0);
  const {isPending,mutateAsync} = useMutation({
    mutationFn:(data:unknown)=>apiCall('POST','withdrawals/request',null,data),
    onSettled(data, error, variables, context) {
      if(data.success){
        alert('SUCCESS');
        setAmount(0);
      }
      else{
        alert('FAILED');
      }
    },
  })

  function handleChange(event:React.ChangeEvent<HTMLInputElement>){
    const value = Number(event.target.value);
    if(user && (value < 0 || value > Number(user.amount))){
      setError(true);
    }
    else{
      setError(false);
    }
    setAmount(value);
  }

  async function handleSubmit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    if(!error && amount!== 0){
      // const result = await sendWithdrawal(user!.id,user!.organization_id,amount);
      await mutateAsync({amount})
    }
  }


  return (
    <div className={classes.container}>
      <div className={classes.detail}>
        <div>Available Amount</div>
        <div><span>$</span><span>{user!.amount}</span></div>
      </div>
      <div className={classes.form_box}>
        <div className={classes.heading}>
          <h1>Withdrawal Request</h1>
        </div>
        <div className={classes.form}>
          <form onSubmit={handleSubmit}>
          <TextField
          id="amount"
          name='amount'
          label="Amount"
          type='number'
          defaultValue={amount}
          variant="filled"
          onChange={handleChange}
          error={error}
          helperText={error ? 'Enter a valid amount' : ''}
        />
        <div>
          <Button variant='contained' type='submit' loading={isPending} loadingPosition='end'>
            Request Withdrawal
          </Button>
        </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default WithdrawPage