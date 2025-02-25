import React from 'react'
import { Card, CardContent, Typography } from '@mui/material';
import { IOrganization } from '../../../types/dataTypes';
import classes from './orgpage.module.css'

interface Props{
    organization:IOrganization;
}

function OrgPage({organization}:Props) {
  return (
    <Card className={classes.container}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Organization Details
            </Typography>
            <Typography><strong>Name:</strong> {organization.name}</Typography>
            <Typography><strong>Description:</strong> {organization.description}</Typography>
            <Typography><strong>Payment ID:</strong> {organization.payment_id}</Typography>
            <Typography><strong>Status:</strong> {organization.status ? "Active" : "Inactive"}</Typography>
          </CardContent>
          <CardContent className={classes.image}>
            <img src={organization.payment_url} alt='payment img'/>
          </CardContent>
        </Card>
  )
}

export default OrgPage