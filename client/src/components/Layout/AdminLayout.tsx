import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../Common/SideBar'
import NavBar from '../Common/NavBar';
import { ISidebarProps } from '../../types/uiTypes';


const SideBarProps:ISidebarProps =[
  {
    heading:'Organization',
    items:[
      {
        text:'Details',
        icon:'icon',
        link:'organization'
      },
      {
        text:'Update Info',
        icon:'icon',
        link:'update'
      },
      {
        text:'Users',
        icon:'icon',
        link:'users-list'
      },
    ],
  },
  {
    heading:'Inbox',
    items:[
      {
        text:'transactions',
        icon:'icon',
        link:'transactions'
      },
      {
        text:'Pendings',
        icon:'icon',
        link:'pending'
      },
      {
        text:'Withdrawals Req',
        icon:'icon',
        link:'withdrawals'
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
        text:'Logout',
        icon:'icon',
        link:'logout'
      }
    ],
  }
]

function AdminLayout() {
  return (
    <>
    <SideBar sidebar={SideBarProps}>
        <>
        <NavBar/>
        <Outlet/>
        </>
    </SideBar>    
    </>
  )
}

export default AdminLayout