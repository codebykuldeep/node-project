import React from 'react'
import { Outlet } from 'react-router-dom'
import { ISidebarProps } from '../../types/uiTypes';
import { Box } from '@mui/material';
import Sidebar from '../Common/UI/SideBar';
import classes from './layout.module.css'

//ICONS
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import IosShareIcon from '@mui/icons-material/IosShare';
import AccountIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

const SideBarProps:ISidebarProps =[
  {
    heading:'Organization',
    items:[
      {
        text:'Home',
        icon:<HomeIcon/>,
        link:''
      },
      // {
      //   text:'Details',
      //   icon:<InfoIcon/>,
      //   link:'organization'
      // },
      {
        text:'Update Info',
        icon:<BusinessIcon/>,
        link:'update'
      },
      {
        text:'Users',
        icon:<PeopleIcon/>,
        link:'users-list'
      },
    ],
  },
  {
    heading:'Inbox',
    items:[
      {
        text:'Transactions',
        icon:<ReceiptLongIcon/>,
        link:'transactions'
      },
      {
        text:'Pendings',
        icon:<PendingActionsIcon/>,
        link:'pending'
      },
      {
        text:'Withdrawals Req',
        icon:<IosShareIcon/>,
        link:'withdrawals'
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
        text:'Logout',
        icon:<LogoutIcon/>,
        link:'logout'
      }
    ],
  }
]

function AdminLayout() {
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

export default AdminLayout