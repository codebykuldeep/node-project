import { useEffect, useState } from 'react';
import DataTable from '../Common/DataTable';
import classes from './organization.module.css'
import axios from 'axios';
import { constant } from '../../helpers/constants';
import { getToken } from '../../helpers/utilityFns';
import { Column, RadioDataTypeForTable } from '../../types/uiTypes';
import { IOrganization } from '../../types/dataTypes';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import SelectTypeRadio from '../Common/SelectTypeRadio';
import { ColumnType } from '../../types/listTypes';
import ShowTable from '../Common/ShowTable';

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
    const [error,setError] =useState<boolean>(false);

    useEffect(()=>{
        async function getData() {
            setError(false);
           try {
            const {data} = await axios.get(constant.SERVER +'/organization',{
                headers:{
                    'Authorization':getToken(),
                }
            })
            setData(data.data)
            setRows(data.data);
           } catch (error) {
            setError(true);
           }
        }
        getData()
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


    if(error){
        return <p>Error Loading page</p>
    }
  return (
    <div className={classes.container}>
        <div className={classes.heading}>
            <h2>Organisations</h2>
            <Link to={'add'} className='main-btn'><Button variant='contained'>Add</Button></Link>
        </div>
        <div>
            <SelectTypeRadio onChange={handleDataType}/>
        </div>
        {data && rows && <ShowTable<IOrganization> columns={OrganizationColumn}  rows={rows}/>}
    </div>
  )
}

export default Organizations;



export const OrganizationColumn:ColumnType[] = [
    {
      id:'organization_id',
      label:'Org ID'
    },
    {
      id:'name',
      label:'Name',
  
    },
    {
      id:'description',
      label:'Description',
      
    },
    {
      id:'status',
      label:'Status',
      format:(value)=>{
        if(Boolean(value) === false){
          return 'inactive'
        }
        return 'active';
      }
    },
]


  
 