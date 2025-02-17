import React from 'react'
import { Outlet } from 'react-router-dom'
import { ISidebarProps } from '../../types/uiTypes';
import { Box } from '@mui/material';
import Sidebar from '../Common/UI/SideBar';
import classes from './layout.module.css'

import HomeIcon from '@mui/icons-material/Home';
import OrgIcon from '@mui/icons-material/CorporateFare';
import AdminIcon from '@mui/icons-material/SupervisorAccount';
import PersonIcon from '@mui/icons-material/Person';
import AccountIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

function SuperAdminLayout() {
  console.log(SideBarProps);
  
  return (
    <>
     <Box className={classes.container} >
    <Sidebar list={SideBarProps}/>
      <Box className={classes.content}>
        <Outlet/>
      </Box>
    </Box>
    </>
  )
}

export default SuperAdminLayout;




const SideBarProps:ISidebarProps =[
  {
    heading:'Home',
    items:[
      {
        text:'Home',
        icon:<HomeIcon/>,
        link:''
      },
      {
        text:'Organization',
        icon:<OrgIcon/>,
        link:'organizations'
      },
      {
        text:'Admins',
        icon:<AdminIcon/>,
        link:'admins-list'
      },
      {
        text:'Users',
        icon:<PersonIcon/>,
        link:'users-list'
      }
    ],
  },
  {
    heading:'Profile',
    items:[
      {
        text:'Account',
        icon:<AccountIcon/>,
        link:'account'
      },
      {
        text:'logout',
        icon:<LogoutIcon/>,
        link:'logout'
      }
    ],
  }
]







