import { useEffect, useState } from 'react';
import DataTable from '../Common/DataTable';
import classes from './organization.module.css'
import axios from 'axios';
import { env } from '../../helpers/constants';
import { getToken } from '../../helpers/utilityFns';
import { Column } from '../../types/uiTypes';
import { IOrganization } from '../../types/dataTypes';

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
    useEffect(()=>{
        async function getData() {
            const {data} = await axios.get(env.SERVER +'/organization',{
                headers:{
                    'Authorization':getToken(),
                }
            })
            setData(data.data.organizations)

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
            <h2>Organisations</h2>
        </div>
        {data && <DataTable columns={columns} rows={data}/>}
    </div>
  )
}

export default Organizations


  
 