import { useEffect, useState } from 'react';
import DataTable from '../Common/DataTable';
import { IUser } from '../../types/dataTypes';
import { constant } from '../../helpers/constants';
import axios from 'axios';
import { getToken } from '../../helpers/utilityFns';
import { Column, RadioDataTypeForTable } from '../../types/uiTypes';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import classes from './org-user.module.css'
import SelectTypeRadio from '../Common/SelectTypeRadio';

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
    const [rows,setRows] = useState<IUser[] | null>(null);
    
  useEffect(()=>{
    async function getData() {
        const {data} = await axios.get(constant.SERVER +'/user/org/'+user!.organization_id,{
            headers:{
                'Authorization':getToken(),
            }
        })
        console.log(data);
        
        setData(data.data);
        setRows(data.data);
    }
    try {
        getData();
    } catch (error) {
        console.log(error);
        
    }
  },[user])
  
  function handleDataType(action:RadioDataTypeForTable){
            let newRows = data;
            if(data && action === 'disabled'){
                newRows = data.filter((entry)=>Boolean(entry.status) === false)
            }
            else if(data && action === 'active'){
                newRows = data.filter((entry)=>Boolean(entry.status) === true)
            }
            console.log(action);
            
            setRows(newRows);
            
        }
  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <h2>Users</h2>
        <Link to={"add"}>
          <Button variant="contained">Add</Button>
        </Link>
      </div>
      <div>
        <SelectTypeRadio onChange={handleDataType} />
      </div>
      {data && rows && rows.length > 0 && <DataTable columns={columns} rows={rows} />}
    </div>
  );
}

export default OrgUsers;