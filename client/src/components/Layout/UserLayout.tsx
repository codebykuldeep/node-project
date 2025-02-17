import React from 'react'
import { Outlet } from 'react-router-dom'
import { ISidebarProps } from '../../types/uiTypes';
import { Box } from '@mui/material';
import classes from './layout.module.css'
import Sidebar from '../Common/UI/SideBar';


//ICONS
import HomeIcon from '@mui/icons-material/Home';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import IosShareIcon from '@mui/icons-material/IosShare';
import AccountIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


function UserLayout() {
    //const location =useLocation();
    
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

export default UserLayout


const SideBarProps:ISidebarProps =[
  {
    heading:'Dashboard',
    items:[
      {
        text:'Home',
        icon:<HomeIcon/>,
        link:''
      },
      {
        text:'Calender',
        icon:<CalendarMonthIcon/>,
        link:'calendar'
      },
    ],
  },
  {
    heading:'Transactions',
    items:[
      {
        text:'Payment List',
        icon:<ReceiptLongIcon/>,
        link:'transactions'
      },
      {
        text:'Withdrawal List',
        icon:<ReceiptLongIcon/>,
        link:'withdrawal'
      },
      {
        text:'Withdraw',
        icon:<IosShareIcon/>,
        link:'withdraw'
      },
    ],
  },
  {
    heading:'Account',
    items:[
      {
        text:'Profile',
        icon:<AccountIcon/>,
        link:'account'
      },
      {
        text:'Logout',
        icon:<LogoutIcon/>,
        link:'logout'
      }
    ],
  }
]
