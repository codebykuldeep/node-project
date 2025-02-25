import React from 'react'
import { Card, CardContent, Typography } from '@mui/material';

import classes from './userdata.module.css'
import { IUser } from '../../../../../types/dataTypes';

interface Props{
    user:IUser;
}

function UserData({user}:Props) {
  return (
    <Card className={classes.container}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              User Details
            </Typography>
            <Typography><strong>Name:</strong> {user.name}</Typography>
            <Typography><strong>email:</strong> {user.email}</Typography>
            <Typography><strong>Phone Number:</strong> {user.number}</Typography>
            <Typography><strong>Amount:</strong> {user.amount}</Typography>
            <Typography><strong>Interest :</strong> {user.interest}</Typography>
            <Typography><strong>Registration Date :</strong> {user.created_at}</Typography>
            <Typography><strong>Status:</strong> {user.status ? "Active" : "Inactive"}</Typography>
          </CardContent>
        </Card>
  )
}

export default UserData;