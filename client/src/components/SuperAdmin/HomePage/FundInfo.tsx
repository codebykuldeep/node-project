import { Box, Card, CardContent, Typography } from '@mui/material'
import React from 'react';
import Grid from '@mui/material/Grid2';

interface Props{
    data:{
      [index:string]:string
    }
  }

function FundInfo({data}:Props) {
  return (
    <Box>
      <Typography variant="h6" py={2}>
        Fund Summary
      </Typography>
      <Grid container spacing={3}>
        {
          dataKeys.map(({id,label})=>(
            <Grid key={label}  size={12/3}>
            <Card>
              <CardContent>
              {label === dataKeys[0].label  && <Typography variant="h6">{Number(data['credit_approved']) - Number(data['debit_approved'])}</Typography>}
                {label !== dataKeys[0].label  && <Typography variant="h6">{Number(data[id])}</Typography>}
                <Typography>{label}</Typography>
              </CardContent>
            </Card>
          </Grid>
          ))
        } 
      </Grid>
    </Box>
  )
}

export default FundInfo;




const dataKeys =[
    {
        id:'',
        label:'Available Funds'
    },
    {
        id:'credit_approved',
        label:'Approved credit'
    },
    {
        id:'credit_pending',
        label:'Pending credit'
    },{
        id:'credit_rejected',
        label:'Rejected credit'
    },{
        id:'debit_approved',
        label:'Approved debit'
    },{
        id:'debit_pending',
        label:'Pedinng debit'
    },{
        id:'debit_rejected',
        label:'Rejected debit'
    }
]