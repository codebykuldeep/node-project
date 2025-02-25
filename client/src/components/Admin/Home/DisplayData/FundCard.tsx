import React from "react";
import {  Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import BalanceCard from "./BalanceCard";

interface Props {
  details: {
    [index: string]: string;
  };
}

const FundCard = ({ details }: Props) => {
  return (
    <div>
      <Typography variant="h6" py={1}>
        Funds Summary
      </Typography>
      <BalanceCard details={details} />
      <Typography variant="body1" py={1}>
        Credit Summary
      </Typography>
      <Grid container spacing={3}>
        {credit_key.map(({label,key}) => (
          <Grid size={12 / 3}  key={key}>
            <Card>
              <CardContent>
                <Typography variant="h5">
                  {" "}
                  $ {Number(details[key])}
                </Typography>
                <Typography>{label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography variant="body1" py={1}>
        Debit Summary
      </Typography>
      <Grid container spacing={3}>
        {debit_key.map(({label,key}) => (
          <Grid size={12 / 3} key={key}>
            <Card>
              <CardContent>
                <Typography variant="h5">
                  {" "}
                  $ {Number(details[key])}
                </Typography>
                <Typography>{label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default FundCard;

const credit_key = [
  {
    label: "Total Approved Credit Amount",
    key: "credit_approved",
  },
  {
    label: "Pending credit amount",
    key: "credit_pending",
  },
  {
    label: "Rejected credit amount",
    key: "credit_rejected",
  },
];

const debit_key = [
  {
    label: "Total Approved Debit Amount",
    key: "debit_approved",
  },
  {
    label: "Pending Debit amount",
    key: "debit_pending",
  },
  {
    label: "Rejected Debit amount",
    key: "debit_rejected",
  },
];

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
