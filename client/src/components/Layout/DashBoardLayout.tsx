import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom"
import { getToken, removeToken } from "../../helpers/utilityFns";
import { constant } from "../../helpers/constants";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { userActions } from "../../store/userState";
import Loading from "../Common/Loading";
import { apiCall } from "../../utils/httpMethod";

function DashBoardLayout() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state:RootState)=>state.userState.user)
  const navigate = useNavigate();

  useEffect(()=>{
    async function getUser() {
      try {
        const data = await apiCall('GET','verify')
        if(data.success){
          dispatch(userActions.setUser({user:data.data}))
        }
        else{
          removeToken();
          navigate('/');
        }
      } catch (error) {
          removeToken();
          navigate('/');
      }
       
    }
    if(getToken()){
      getUser();
    }
  },[dispatch,navigate])

  if(!user){
    return <Loading/>
  }
  
  return (
    <>
    <Outlet/>
    </>
  )
}

export default DashBoardLayout;