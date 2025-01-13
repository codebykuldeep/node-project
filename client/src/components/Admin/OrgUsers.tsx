import { useEffect, useState } from 'react';
import DataTable from '../Common/DataTable';
import { IUser } from '../../types/dataTypes';
import { env } from '../../helpers/constants';
import axios from 'axios';
import { getToken } from '../../helpers/utilityFns';
import { Column } from '../../types/uiTypes';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import classes from './org-user.module.css'

const columns: readonly Column[] = [
    { id: 'name', label: 'Name', minWidth: 150,},
    { id: 'email', label: 'Email', minWidth: 150 },
    {
        id: 'status',
        label: 'Status',
        minWidth: 170,
        align: 'center',
    },
    { id: 'number', label: 'Phone Number', minWidth: 150 },
    {id:'action',label:'Action',minWidth:150,actionElement:<button onClick={(e)=>{console.log(e)}}>Deactivate</button>}

  ];

function OrgUsers() {
    const user = useSelector((state:RootState)=>state.userState.user)
  const [data,setData] = useState<IUser[] | null>(null);
  useEffect(()=>{
    async function getData() {
        const {data} = await axios.get(env.SERVER +'/user/org/'+user!.organization_id,{
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
    <div  className={classes.container}>
        <div className={classes.heading}>
            <h2>Users</h2>
            <Link to={'add'}><Button variant='contained'>Add</Button></Link>
        </div>
        {data && data.length> 0 && <DataTable columns={columns} rows={data}/>}
    </div>
  )
}

export default OrgUsers;