import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../Common/SideBar'
import NavBar from '../Common/NavBar';
import { ISidebarProps } from '../../types/uiTypes';
import SearchBar from '../SuperAdmin/UI/SearchBar';


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

function SuperAdminLayout() {
  console.log(SideBarProps);
  
  return (
    <>
    <SideBar sidebar={SideBarProps}>
        <>
        <NavBar><SearchBar/></NavBar>
        <Outlet/>
        </>
    </SideBar>    
    </>
  )
}

export default SuperAdminLayout






