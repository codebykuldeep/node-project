import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid2";
import ShowChart from "./ShowChart";

import classes from './card.module.css';

interface Props {
  details: {
    [index: string]: string;
  };
}

function BalanceCard({ details }: Props) {
  const FundData = [
    {
      label: "Credited Amount",
      value: Number(details.credit_approved),
      color: "#0088FE",
    },
    {
      label: "Debited Amount",
      value: Number(details.debit_approved),
      color: "#00C49F",
    },
  ];

  const CreditData = [
    {
      label: "Approved",
      value: Number(details.credit_approved),
      color: "#0088FE",
    },
    {
      label: "Rejected",
      value: Number(details.credit_rejected),
      color: "#00C49F",
    },
    {
      label: "Pending",
      value: Number(details.credit_pending),
      color: "#00C49F",
    },
  ];


  const DebitData = [
    {
      label: "Approved",
      value: Number(details.debit_approved),
      color: "#0088FE",
    },
    {
      label: "Rejected",
      value: Number(details.debit_rejected),
      color: "#00C49F",
    },
    {
      label: "Pending",
      value: Number(details.debit_pending),
      color: "#00C49F",
    },
  ];
  return (
    <Box>
      <Grid container spacing={3} display="flex">
        <Grid size={12 / 3} >
          <Card className={classes.bal_card}>
            <CardContent className={classes.card_content}>
            <Typography sx={{ color: '#777' }}>Total Available Funds</Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                ${" "}
                {Number(details.credit_approved) -
                  Number(details.debit_approved)}
              </Typography>
              
              <ShowChart data={FundData} />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={12 / 3}>
          <Card className={classes.bal_card}>
          <CardContent className={classes.card_content}>
            <Typography sx={{ color: '#777' }}>Total Credit History</Typography>
              
              <ShowChart data={CreditData} />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={12 / 3}>
          <Card className={classes.bal_card}>
          <CardContent className={classes.card_content}>
            <Typography sx={{ color: '#777' }}>Total Debit History</Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                ${" "}
                {Number(details.credit_approved) -
                  Number(details.debit_approved)}
              </Typography>
              
              <ShowChart data={DebitData} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default BalanceCard;
