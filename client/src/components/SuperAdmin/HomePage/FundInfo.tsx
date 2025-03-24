import { Box, Paper, Typography } from '@mui/material'
import React from 'react';
import Grid from '@mui/material/Grid2';
import { AttachMoney, CreditScore, Done, Error, MoneyOff, PendingActions } from '@mui/icons-material';
import classes from './super-home.module.css'

interface Props{
    data:{
      [index:string]:string
    }
  }

function FundInfo({data}:Props) {
  return (
    <Box>
      <Typography
        variant="h6"
        sx={{ marginBottom: "10px", color: "#555", fontWeight: "bold" }}
      >
        Fund Summary
      </Typography>
      <Grid container spacing={3}>
        {dataKeys.map(({ id, label, icon }) => (
          <Grid sx={{ xs: 12, sm: 6, md: 4 }} key={id} size={12 / 3}>
            <Paper
              elevation={3}
              className={classes.card_paper}
            >
              <Box>{icon ? icon : ""}</Box>
              <Box sx={{ textAlign: "right" }}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: "#1976d2" }}
                >
                  {label === dataKeys[0].label &&
                    Number(data[dataKeys[1].id]) + Number(data[dataKeys[2].id])}
                  {label !== dataKeys[0].label && Number(data[id])}
                </Typography>
                <Typography variant="body2" sx={{ color: "#777" }}>
                  {label}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default FundInfo;




const dataKeys =[
    {
        id:'',
        icon: <AttachMoney style={{ color: '#4caf50' }} />,
        label:'Available Funds'
    },
    {
        id:'credit_approved',
        icon: <CreditScore style={{ color: '#2196f3' }} />,
        label:'Approved credit'
    },
    {
        id:'credit_pending',
        icon: <PendingActions style={{ color: '#ff9800' }} />,
        label:'Pending credit'
    },{
        id:'credit_rejected',
        icon: <Done style={{ color: '#8bc34a' }} />,
        label:'Rejected credit'
    },{
        id:'debit_approved',
        icon: <PendingActions style={{ color: '#ff5722' }} />,
        label:'Approved debit'
    },{
        id:'debit_pending',
        icon: <Error style={{ color: '#f44336' }} />,
        label:'Pedinng debit'
    },{
        id:'debit_rejected',
        icon: <MoneyOff style={{ color: '#9e9e9e' }} />,
        label:'Rejected debit'
    }
]