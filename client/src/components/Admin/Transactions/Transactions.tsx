import { useEffect, useState } from 'react';
import DataTable from '../UI/DataTable';
import { ITransaction } from '../../../types/dataTypes';
import { constant } from '../../../helpers/constants';
import axios from 'axios';
import { getToken } from '../../../helpers/utilityFns';
import { Column } from '../../../types/uiTypes';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import classes from '../org-user.module.css'
import TransactionDetail from './TransactionDetail';

const columns: readonly Column[] = [
    { id: 'user_id', label: 'User ID', minWidth: 150,},
    { id: 'amount', label: 'Amount', minWidth: 150 },
    {
        id: 'approved',
        label: 'Status',
        minWidth: 170,
        align: 'center',
    },
    { id: 'created_at', label: 'Payment Date', minWidth: 150 },
  ];

function Transactions({id}:{id?:string}) {
    const user = useSelector((state:RootState)=>state.userState.user)
  const [data,setData] = useState<ITransaction[] | null>(null);
  const [modalData,setModalData] = useState<ITransaction | null>(null)
    const [update,setUpdate] = useState(1);
  const [open, setOpen] = useState<boolean>(false);
    const handleOpen = (transaction:ITransaction) =>{
        setModalData(transaction)
      
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    function updataData(){
        setUpdate(prev=>prev+1);
    }
  
  const org_id = id || user!.organization_id;

  useEffect(()=>{
    async function getData() {
        const {data} = await axios.get(constant.SERVER +'/transactions/org/'+org_id,{
            headers:{
                'Authorization':getToken(),
            },
            params:{
                type:'all'
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
  },[user,update,org_id])
  return (
    <div  className={classes.container}>
        <div className={classes.heading}>
            <h2>Transactions</h2>
        </div>

        {data && <TransactionDetail open={open} handleClose={handleClose} data={modalData!} updateData={updataData}/>}
        {data && data.length> 0 && <DataTable columns={columns} rows={data} handleOpen={handleOpen}/>}
        {data && data.length === 0 && <p>No transactions</p>}
    </div>
  )
}

export default Transactions;