import React from "react";
import { Box, Card, CardContent, Paper, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import PeopleIcon from '@mui/icons-material/People';
import classes from './card.module.css';

interface Props{
  details:{
    [index:string]:string;
  }
}

const UserCard = ({details}:Props) => {
  
  return (
    // <div>
    //   <Typography variant="h6" py={2}>
    //     Users Summary
    //   </Typography>
    //   <Grid container spacing={3}>
    //     <Grid  size={12/3}>
    //       <Card>
    //         <CardContent>
    //           <Typography variant="h6">{Number(details.user_active) + Number(details.user_inactive)}</Typography>
    //           <Typography>Total Users</Typography>
    //         </CardContent>
    //       </Card>
    //     </Grid>

        
    //     <Grid size={12/3} >
    //       <Card>
    //         <CardContent>
    //           <Typography variant="h6">{Number(details.user_active)}</Typography>
    //           <Typography>Active Users</Typography>
    //         </CardContent>
    //       </Card>
    //     </Grid>

    //     <Grid size={12/3}>
    //       <Card>
    //         <CardContent>
    //           <Typography variant="h6">{Number(details.user_inactive)}</Typography>
    //           <Typography>Inactive Users</Typography>
    //         </CardContent>
    //       </Card>
    //     </Grid>

        
    //   </Grid>
    // </div>
    <Box>
           <Box sx={{ marginBottom: '20px' }}>
              <Typography variant="h6" sx={{ marginBottom: '10px', color: '#555', fontWeight: 'bold' }}>
                User Summary
              </Typography>
              <Grid container spacing={3}>
                {UsersdataKeys.map(({id,label,icon}) => (
                  <Grid sx={{xs:12,sm:6,md:4}} key={id} size={12/3}>
                    <Paper
                      elevation={3}
                      className={classes.card_paper}
                    >
                      <Box>{icon ? icon : ""}</Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                        {label === UsersdataKeys[0].label  && Number(details[UsersdataKeys[1].id]) + Number(details[UsersdataKeys[2].id])}
                        {label !== UsersdataKeys[0].label  && Number(details[id])}
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
  );
};

export default UserCard;


const UsersdataKeys = [
    {
      id: "user_active",
      icon:<PeopleIcon color="primary" />,
      label: "Total Users",
    },
    {
      id: "user_active",
      icon:<PeopleIcon color="success" />,
      label: "User Active",
    },
    {
      id: "user_inactive",
      icon:<PeopleIcon color="error" />,
      label: "User Inactive",
    },
  ];

