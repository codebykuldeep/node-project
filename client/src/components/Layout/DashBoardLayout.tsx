import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";
import { useEffect } from "react";
import { Outlet } from "react-router-dom"
import { getToken } from "../../helpers/utilityFns";
import { env } from "../../helpers/constants";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { userActions } from "../../store/userState";

function DashBoardLayout() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state:RootState)=>state.userState.user)
  

  useEffect(()=>{
    async function getUser() {
      const config: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization':getToken(),
        } as RawAxiosRequestHeaders,
      };
       const {data} = await axios.get<any>(env.SERVER+'/user/verify',config)
      
       dispatch(userActions.setUser({user:data.data.user}))
       
    }
    if(getToken()){
      getUser();
    }
  },[])

  if(!user){
    return <p>Loading .....</p>
  }
  
  return (
    <>
    <Outlet/>
    </>
  )
}

export default DashBoardLayout;