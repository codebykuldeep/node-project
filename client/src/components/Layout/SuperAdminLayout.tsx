import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../Common/SideBar'
import NavBar from '../Common/NavBar';
import { ISidebarProps } from '../../types/uiTypes';
import SearchBar from '../SuperAdmin/UI/SearchBar';
import { Box } from '@mui/material';
import Sidebar from '../Common/UI/SideBar';
import classes from './layout.module.css'

const SideBarProps:ISidebarProps =[
  {
    heading:'Home',
    items:[
      {
        text:'Home',
        icon:'icon',
        link:''
      },
      {
        text:'Organization',
        icon:'icon',
        link:'organizations'
      },
      {
        text:'Admins',
        icon:'icon',
        link:'admins-list'
      },
      {
        text:'Users',
        icon:'icon',
        link:'users-list'
      }
    ],
  },
  {
    heading:'Profile',
    items:[
      {
        text:'Account',
        icon:'icon',
        link:'account'
      },
      {
        text:'logout',
        icon:'icon',
        link:'logout'
      }
    ],
  }
]

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

export default SuperAdminLayout






