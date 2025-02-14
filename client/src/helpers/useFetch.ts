import { useEffect, useState } from "react";
import { constant } from "./constants";
import axios from "axios";
import { DataResponse, Iparams } from "../types/axios";
import { getToken } from "./utilityFns";


export function useFetch<T>(url:string , params?:Iparams){
    const [data,setData] = useState<T | null>(null);
    const [loading,setLoading] = useState<boolean>(true);
    const [error,setError] = useState<boolean>(false);
    const [count,setCount] = useState<number>(0);


    function update(){
        setCount(prev=>prev+1);
    }

    useEffect(()=>{
        async function getData() {
            setLoading(true);
            setError(false);
            try {
                const {data}:DataResponse<T> = await axios.get(constant.SERVER +url,{
                    headers:{
                        'Authorization':getToken(),
                    },
                    params:params
                })
                if(Boolean(data.success)){
                    setData(data.data);
                }
                else{
                    throw new Error('failed to fetch data')
                }
                setLoading(false);
            } catch (error) {
                setError(true);
                console.log(error);
            }
        }
        getData()   
      },[url,params,count])


      return [data,loading,error,update];
}