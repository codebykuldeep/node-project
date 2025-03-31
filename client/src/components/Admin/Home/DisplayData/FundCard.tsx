import React from "react";
import {  Box, Card, CardContent, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import BalanceCard from "./BalanceCard";
import classes from './card.module.css';
import { AttachMoney } from "@mui/icons-material";

interface Props {
  details: {
    [index: string]: string;
  };
}

const FundCard = ({ details }: Props) => {
  return (
    <div>
      <Typography variant="h6" py={1} sx={{ marginBottom: '10px', color: '#555', fontWeight: 'bold' }}>
        Funds Summary
      </Typography>
      <BalanceCard details={details} />
      
      {keyArr.map(({label,keys})=>(
        <Box sx={{ my: '20px' }} key={label}>
        <Typography variant="h6" sx={{ marginBottom: '10px', color: '#555', fontWeight: 'bold' }}>
          {label}
        </Typography>
        <Grid container spacing={3}>
          {keys.map(({key,label,icon}) => (
            <Grid sx={{xs:12,sm:6,md:4}} key={key} size={12/3}>
              <Paper
                elevation={3}
                className={classes.card_paper}
              >
                <Box>{icon ? icon : ""}</Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
    
                  {Number(details[key])}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#777' }}>
                    {label}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
      ))}
    </div>
  );
};

export default FundCard;

const credit_key = [
  {
    label: "Total Approved Credit Amount",
    icon: <AttachMoney style={{ color: '#4caf50' }} />,
    key: "credit_approved",
  },
  {
    label: "Pending credit amount",
    icon: <AttachMoney style={{ color: '#4caf50' }} />,
    key: "credit_pending",
  },
  {
    label: "Rejected credit amount",
    icon: <AttachMoney style={{ color: '#4caf50' }} />,
    key: "credit_rejected",
  },
];

const debit_key = [
  {
    label: "Total Approved Debit Amount",
    icon: <AttachMoney style={{ color: '#4caf50' }} />,
    key: "debit_approved",
  },
  {
    label: "Pending Debit amount",
    icon: <AttachMoney style={{ color: '#4caf50' }} />,
    key: "debit_pending",
  },
  {
    label: "Rejected Debit amount",
    icon: <AttachMoney style={{ color: '#4caf50' }} />,
    key: "debit_rejected",
  },
];


const keyArr =[
  {
    label:'Credit Summary',
    keys:credit_key,
  },
  {
    label:'Debit Summary',
    keys:debit_key,
  }
]