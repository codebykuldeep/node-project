import { Box, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import UserData from '../../SuperAdmin/DetailPage/UserPage/DisplayData/UserData';

function UserHome() {
    const user = useSelector((state:RootState)=>state.userState.user);
  return (
    <Box>
        <Typography variant='h4'>Hello, {user!.name}</Typography>
        <UserData  user={user!}/>
    </Box>
  )
}

export default UserHome