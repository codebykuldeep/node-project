import React from 'react'
import SideBar from '../Common/SideBar'
import { Outlet, useLocation } from 'react-router-dom'
import NavBar from '../Common/NavBar';

function UserLayout() {
    const location =useLocation();
    
  return (
    <>
    <SideBar>
        <>
        <NavBar/>
        <Outlet/>
        </>
    </SideBar>    
    </>
  )
}

export default UserLayout