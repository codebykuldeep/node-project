import { Box, Card, CardContent, Typography } from '@mui/material'
import React from 'react';
import Grid from '@mui/material/Grid2';

type itemDetail ={id:string,label:string}

interface Props{
    data:{
      [index:string]:string
    }
    dataKeys:itemDetail[];
    header:string
  }

function CardInfo({data,dataKeys,header}:Props) {
  return (
    <Box>
      <Typography variant="h6" py={2}>
        {header} Summary
      </Typography>
      <Grid container spacing={3}>
        {
          dataKeys.map(({id,label})=>(
            <Grid key={label}  size={12/3}>
            <Card>
              <CardContent>
              {label === dataKeys[0].label  && <Typography variant="h6">{Number(data[dataKeys[1].id]) + Number(data[dataKeys[2].id])}</Typography>}
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

export default CardInfo