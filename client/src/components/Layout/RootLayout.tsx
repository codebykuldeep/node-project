import { Outlet } from "react-router-dom"

function RootLayout() {
  console.log('Running...');
  
  return (
    <>
    <Outlet/>
    </>
  )
}

export default RootLayout