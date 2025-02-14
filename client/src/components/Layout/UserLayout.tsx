import React from 'react'
import SideBar from '../Common/SideBar'
import { Outlet } from 'react-router-dom'
import NavBar from '../Common/NavBar';
import { ISidebarProps } from '../../types/uiTypes';
import { Box } from '@mui/material';
import classes from './layout.module.css'
import Sidebar from '../Common/UI/SideBar';



function UserLayout() {
    //const location =useLocation();
    
  return (
    <>
    {/* <SideBar sidebar={SideBarProps}>
        <>
        <NavBar/>
        <Outlet/>
        </>
    </SideBar>  */}
    <Box className={classes.container} >
    <Sidebar list={SideBarProps}/>
      <Box className={classes.content}>
        <Outlet/>
      </Box>
    </Box>   
    </>
  )
}

export default UserLayout


const SideBarProps:ISidebarProps =[
  {
    heading:'Home',
    items:[
      {
        text:'Dashboard',
        icon:'icon',
        link:''
      },
      {
        text:'Calender',
        icon:'icon',
        link:'calendar'
      },
    ],
  },
  {
    heading:'Transactions',
    items:[
      {
        text:'Payment List',
        icon:'icon',
        link:'transactions'
      },
      {
        text:'Withdrawal List',
        icon:'icon',
        link:'withdrawal'
      },
      {
        text:'Withdraw',
        icon:'icon',
        link:'withdraw'
      },
    ],
  },
  {
    heading:'Account',
    items:[
      {
        text:'Profile',
        icon:'icon',
        link:'account'
      },
      {
        text:'Logout',
        icon:'icon',
        link:'logout'
      }
    ],
  }
]
