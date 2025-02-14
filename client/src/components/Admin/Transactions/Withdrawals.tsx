import { useEffect, useState } from 'react';
import DataTable from '../UI/DataTable';
import { ITransaction } from '../../../types/dataTypes';
import { constant } from '../../../helpers/constants';
import axios from 'axios';
import { getToken } from '../../../helpers/utilityFns';
import { Column, TransactionTypeForTable } from '../../../types/uiTypes';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import classes from '../org-user.module.css'
import WithdrawalDetail from './WithdrawalDetail';
import TransactionRadioBtn from '../../Common/TransactionRadioBtn';

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

function Withdrawals({id}:{id?:string}) {
    const user = useSelector((state:RootState)=>state.userState.user)
  const [data,setData] = useState<ITransaction[] | null>(null);
  const [rows,setRows] = useState<ITransaction[] | null>(null);
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
        const {data} = await axios.get(constant.SERVER +'/withdrawals/org/'+org_id,{
            headers:{
                'Authorization':getToken(),
            },
        })
        console.log(data);
        
        setData(data.data)
        setRows(data.data);
    }
    try {
        getData();
    } catch (error) {
        console.log(error);
        
    }
  },[user,update,org_id])


  function handleRadioBtn(action:TransactionTypeForTable){
    let newRows = data;
    console.log(data![1].approved)
    
    if(data && action === 'pending'){
        
        newRows = data.filter((entry)=>(entry.approved === null) )
        
    }
    else if(data && action === 'approved'){
        newRows = data.filter((entry)=>Boolean(entry.approved) === true)
    }
    else if(data && action === 'rejected'){
        newRows = data.filter((entry)=>( entry.approved !== null && Boolean(entry.approved) === false))
    }
    
    setRows(newRows);
    
}
  return (
    <div  className={classes.container}>
        <div className={classes.heading}>
            <h2>Withdrawals</h2>
        </div>
        <div>
            <TransactionRadioBtn onChange={handleRadioBtn}/>
        </div>
        {data && <WithdrawalDetail open={open} handleClose={handleClose} data={modalData!} updateData={updataData}/>}
        {rows && rows.length> 0 && <DataTable columns={columns} rows={rows} handleOpen={handleOpen}/>}
        {rows && rows.length === 0 && <p>No transactions</p>}
    </div>
  )
}

export default Withdrawals;