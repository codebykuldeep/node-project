import axios from "axios";
import { constant } from "../helpers/constants";
import { getToken } from "../helpers/utilityFns";

const SERVER  = constant.SERVER;

type HttpMethod ='GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' ;

export async function apiCall(method:HttpMethod,endpoint:string,params?:unknown,body?:unknown){
    const reqURL = SERVER + '/' + endpoint;
    
    
    try {
        switch(method){
            case 'GET':{
                const {data} = await axios.get(reqURL,{
                    params,
                    headers:{
                        'Authorization' : getToken(),
                    }
                })
                if(Boolean(data.success)){
                    return data;
                }
                else{
                    throw new Error(data.data.message);
                }
                
                
            };
            case 'POST':{
                const {data} = await axios.post(reqURL,body,{
                    params,
                    headers:{
                        'Authorization' : getToken(),
                    }
                })
                return data;
                
            };
            case 'PATCH':{
                const {data} = await axios.patch(reqURL,body,{
                    params,
                    headers:{
                        'Authorization' : getToken(),
                    }
                })
                return data;
            };
            case 'PUT':{
                const {data} = await axios.put(reqURL,body,{
                    params,
                    headers:{
                        'Authorization' : getToken(),
                    }
                })
                return data;
            };
            case 'DELETE':{
                const {data} = await axios.delete(reqURL,{
                    params,
                    headers:{
                        'Authorization' : getToken(),
                    }
                })
                return data;
            };
            default:{ console.log('SOMETHING IS WRONG');
            }
        }
    } catch (error) {
        const message = (error as {message:string}).message;
        if(method === 'GET'){
            throw new Error(message);
        }
        
        return {status:false,message:message}
    }
}