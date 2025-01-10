import { useEffect, useState } from 'react';
import DataTable from '../Common/DataTable';
import classes from './organization.module.css'
import { IUser } from '../../types/dataTypes';
import { env } from '../../helpers/constants';
import axios from 'axios';
import { getToken } from '../../helpers/utilityFns';
import { Column } from '../../types/uiTypes';

const columns: readonly Column[] = [
    { id: 'user', label: 'Name', minWidth: 150,},
    { id: 'email', label: 'Email', minWidth: 150 },
    {
        id: 'status',
        label: 'Status',
        minWidth: 170,
        align: 'center',
    },
    { id: 'name', label: 'Organization', minWidth: 150 },
    {id:'action',label:'Action',minWidth:150,actionElement:<button onClick={(e)=>{console.log(e)}}>Deactivate</button>}

  ];

function Users() {
  const [data,setData] = useState<IUser[] | null>(null);
  useEffect(()=>{
    async function getData() {
        const {data} = await axios.get(env.SERVER +'/user/',{
            headers:{
                'Authorization':getToken(),
            }
        })
        console.log(data);
        
        setData(data.data)

    }
    try {
        getData();
    } catch (error) {
        console.log(error);
        
    }
  },[])
  return (
    <div className={classes.container}>
        <div className={classes.heading}>
            <h2>Users</h2>
        </div>
        {data && data.length> 0 && <DataTable columns={columns} rows={data}/>}
    </div>
  )
}

export default Users;