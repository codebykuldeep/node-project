import { useEffect, useState } from 'react';
import DataTable from '../Common/DataTable';
import classes from './organization.module.css'
import { IUser } from '../../types/dataTypes';
import axios from 'axios';
import { getToken } from '../../helpers/utilityFns';
import { env } from '../../helpers/constants';
import { Column, RadioDataTypeForTable } from '../../types/uiTypes';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import SelectTypeRadio from '../Common/SelectTypeRadio';

const columns: readonly Column[] = [
    { id: 'admin', label: 'Name', minWidth: 150,},
    { id: 'email', label: 'Email', minWidth: 150 },
    {
        id: 'status',
        label: 'Status',
        minWidth: 170,
        align: 'center',
    },
    { id: 'name', label: 'Organization', minWidth: 150 },
    //{id:'action',label:'Action',minWidth:150,actionElement:<button onClick={(e)=>{console.log(e)}}>Deactivate</button>}

  ];


function Admins() {
  const [data,setData] = useState<IUser[] | null>(null);
  const [rows,setRows] = useState<IUser[] | null>(null);
  useEffect(()=>{
        async function getData() {
            const {data} = await axios.get(env.SERVER +'/user/admin',{
                headers:{
                    'Authorization':getToken(),
                }
            })
            console.log(data);
            
            setData(data.data)
            setRows(data.data)
        }
        try {
            getData();
        } catch (error) {
            console.log(error);
            
        }
    },[])
    function handleDataType(action:RadioDataTypeForTable){
          let newRows = data;
          if(data && action === 'disabled'){
              newRows = data.filter((entry)=>Boolean(entry.admin_status) === false)
          }
          else if(data && action === 'active'){
              newRows = data.filter((entry)=>Boolean(entry.admin_status) === true)
          }
          console.log(action);
          
          setRows(newRows);
          
    }
  return (
    <div className={classes.container}>
        <div className={classes.heading}>
            <h2>Admins</h2>
            <Link to={'add'}><Button variant='contained'>Add</Button></Link>
        </div>
        <div>
            <SelectTypeRadio onChange={handleDataType}/>
        </div>
        {data && rows &&  rows.length> 0 && <DataTable columns={columns} rows={rows} idName='admin_id'/>}
    </div>
  )
}

export default Admins