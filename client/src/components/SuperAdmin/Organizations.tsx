import { useEffect, useState } from 'react';
import DataTable from '../Common/DataTable';
import classes from './organization.module.css'
import axios from 'axios';
import { env } from '../../helpers/constants';
import { getToken } from '../../helpers/utilityFns';
import { Column, RadioDataTypeForTable } from '../../types/uiTypes';
import { IOrganization } from '../../types/dataTypes';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import SelectTypeRadio from '../Common/SelectTypeRadio';

const columns: readonly Column[] = [
    { id: 'name', label: 'Name', minWidth: 170,},
    {
        id: 'status',
        label: 'Status',
        minWidth: 170,
        align: 'center',
    },
    { id: 'description', label: 'Description', minWidth: 150 },
    {id:'action',label:'Action',minWidth:150,actionElement:<button onClick={(e)=>{console.log(e)}}>Deactivate</button>}

  ];

function Organizations() {
    const [data,setData] = useState<IOrganization[] | null>(null);
    const [rows,setRows] = useState<IOrganization[] | null>(null);

    useEffect(()=>{
        async function getData() {
            const {data} = await axios.get(env.SERVER +'/organization',{
                headers:{
                    'Authorization':getToken(),
                }
            })
            setData(data.data.organizations)
            setRows(data.data.organizations);
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
            <h2>Organisations</h2>
            <Link to={'add'}><Button variant='contained'>Add</Button></Link>
        </div>
        <div>
            <SelectTypeRadio onChange={handleDataType}/>
        </div>
        {data && rows && <DataTable columns={columns} rows={rows}/>}
    </div>
  )
}

export default Organizations


  
 