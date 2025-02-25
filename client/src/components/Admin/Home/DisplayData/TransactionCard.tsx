import React from 'react'
import {  Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

interface Props {
    details: {
      [index: string]: string;
    };
  }

function TransactionCard({ details }: Props) {
  return (
    <div>
    <Typography variant="h6" py={1}>
      Transactions Summary
    </Typography>
    <Grid container spacing={3}>
    <Grid size={12 / 3} >
          <Card>
            <CardContent>
              <Typography variant="h5">
                {" "}
                $ {23}
              </Typography>
              <Typography>label</Typography>
            </CardContent>
          </Card>
        </Grid>
    </Grid>
    <Typography variant="body1" py={1}>
      Debit Summary
    </Typography>
  </div>
  )
}

export default TransactionCard