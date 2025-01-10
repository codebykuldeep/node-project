import React from 'react'
import SideBar from '../Common/SideBar'
import { Outlet } from 'react-router-dom'
import NavBar from '../Common/NavBar';
import { ISidebarProps } from '../../types/uiTypes';

const SideBarProps:ISidebarProps =[
  {
    heading:'Lists',
    items:[
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
    heading:'heading 2',
    items:[
      {
        text:'inbox',
        icon:'icon',
        link:''
      },
      {
        text:'inbox',
        icon:'icon',
        link:''
      }
    ],
  }
]


function UserLayout() {
    //const location =useLocation();
    
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

export default UserLayout