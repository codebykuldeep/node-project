import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';

interface Props{
  details:{
    [index:string]:string;
  }
}

const UserCard = ({details}:Props) => {
  
  return (
    <div>
      <Typography variant="h6" py={2}>
        Users Summary
      </Typography>
      <Grid container spacing={3}>
        <Grid  size={12/3}>
          <Card>
            <CardContent>
              <Typography variant="h6">{Number(details.user_active) + Number(details.user_inactive)}</Typography>
              <Typography>Total Users</Typography>
            </CardContent>
          </Card>
        </Grid>

        
        <Grid size={12/3} >
          <Card>
            <CardContent>
              <Typography variant="h6">{Number(details.user_active)}</Typography>
              <Typography>Active Users</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12/3}>
          <Card>
            <CardContent>
              <Typography variant="h6">{Number(details.user_inactive)}</Typography>
              <Typography>Inactive Users</Typography>
            </CardContent>
          </Card>
        </Grid>

        
      </Grid>
    </div>
  );
};

export default UserCard;


// credit_approved
// : 
// null
// credit_pending
// : 
// "500"
// credit_rejected
// : 
// null
// debit_approved
// : 
// null
// debit_pending
// : 
// "70"
// debit_rejected
// : 
// null
// user_active
// : 
// "2"
// user_inactive
// : 
// "0