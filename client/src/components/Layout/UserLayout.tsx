import React from 'react'
import SideBar from '../Common/SideBar'
import { Outlet } from 'react-router-dom'
import NavBar from '../Common/NavBar';
import { ISidebarProps } from '../../types/uiTypes';


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
        link:''
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