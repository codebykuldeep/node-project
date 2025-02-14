import axios from "axios";
import { constant } from "../helpers/constants";
import { getToken } from "../helpers/utilityFns";
import cache from './memoization';

export async function getOrganizationData(id:string) {
    const {data} = await axios.get(constant.SERVER +'/organization/'+ id,{
        headers:{
            'Authorization':getToken(),
        }
    })
    
 return (data.data.organization);
}


export async function fetchSearchResults(query:string){
    if(cache.check(query)){
        console.log('getting data from cache');
        
        return cache.get(query);
    }
    console.log('searching');
    
    try {
        const {data} = await axios.get(constant.SERVER + '/admin/search',{
            params:{
              query:query,
            },
            headers:{
              'Authorization':getToken()
            }
          })
          if(data.success){
            cache.set(query,data.data);
            return data.data;
          }
          throw new Error('failed');
    } catch (error) {
        console.log(error);
        return undefined;
    }

}