import React from 'react'
import { Outlet } from 'react-router-dom'

function SuperAdminLayout() {
  return (
    <>
    <Outlet/>
    </>
  )
}

export default SuperAdminLayout