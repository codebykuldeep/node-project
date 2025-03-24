import { Box, Paper, Typography } from '@mui/material'
import React from 'react';
import Grid from '@mui/material/Grid2';
import classes from './super-home.module.css'

type itemDetail ={id:string,label:string,icon?:React.ReactNode}

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
       <Box sx={{ marginBottom: '20px' }}>
          <Typography variant="h6" sx={{ marginBottom: '10px', color: '#555', fontWeight: 'bold' }}>
            {header}
          </Typography>
          <Grid container spacing={3}>
            {dataKeys.map(({id,label,icon}) => (
              <Grid sx={{xs:12,sm:6,md:4}} key={id} size={12/3}>
                <Paper
                  elevation={3}
                  className={classes.card_paper}
                >
                  <Box>{icon ? icon : ""}</Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                    {label === dataKeys[0].label  && Number(data[dataKeys[1].id]) + Number(data[dataKeys[2].id])}
                    {label !== dataKeys[0].label  && Number(data[id])}
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
    </Box>
  )
}

export default CardInfo