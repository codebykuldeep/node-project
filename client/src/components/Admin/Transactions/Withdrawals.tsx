import { useEffect, useState } from 'react';
import { ITransaction } from '../../../types/dataTypes';
import {  TransactionTypeForTable } from '../../../types/uiTypes';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import classes from '../org-user.module.css'
import WithdrawalDetail from './WithdrawalDetail';
import TransactionRadioBtn from '../../Common/TransactionRadioBtn';
import { apiCall } from '../../../utils/httpMethod';
import { useQuery } from '@tanstack/react-query';
import ShowTable from '../../Common/ShowTable';
import { ColumnType } from '../../../types/listTypes';


function Withdrawals({id}:{id?:string}) {
    const user = useSelector((state:RootState)=>state.userState.user)
    const [modalData,setModalData] = useState<ITransaction | null>(null)
    const [rows,setRows] = useState<ITransaction[]>([])
    const {data,isFetching,isError,refetch} = useQuery({
      queryKey:[],
      queryFn:()=>apiCall('GET','withdrawals/org/'+user!.organization_id)
    })
    const [open, setOpen] = useState<boolean>(false)

    useEffect(()=>{
        if(data && data.data.length > 0){
            setRows(data.data)
        }

    },[data])
  
      const handleOpen = (transaction:ITransaction) =>{
          setModalData(transaction)
        
          setOpen(true);
      };
      const handleClose = () => setOpen(false);
  
    if(isFetching){
      return <p>Loading....</p>
    }
  
    if(isError){
      return <p>Error while loading page</p>
    }
   

    function handleRadioBtn(action:TransactionTypeForTable){
        const oldRows:ITransaction[] = data.data;
        let newRows = data;
        if(oldRows.length === 0)
            return;
        
        if(oldRows && action === 'pending'){
            
            newRows = oldRows.filter((entry)=>(entry.approved === null) )
            
        }
        else if(oldRows && action === 'approved'){
            newRows = oldRows.filter((entry)=>Boolean(entry.approved) === true)
        }
        else if(oldRows && action === 'rejected'){
            newRows = oldRows.filter((entry)=>( entry.approved !== null && Boolean(entry.approved) === false))
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
        {data && modalData && <WithdrawalDetail open={open} handleClose={handleClose} data={modalData!} updateData={refetch}/>}
        {data && rows.length> 0 && <ShowTable<ITransaction> columns={columns} rows={rows} openModal={handleOpen} />}
        {data && rows.length === 0 && <p>No Withdrawals transactions</p>}
    </div>
  )
}

export default Withdrawals;



const columns: ColumnType[] = [
  { id: "user_id", label: "User ID" },
  { id: "amount", label: "Amount"},
  {
    id: "payment_type",
    label: "Payment Type",
    align:'center',
    format:(value)=>{
      if(Boolean(value) === false)
        return 'debit';

      return 'credit';
    }
  },
  {
    id: "approved",
    label: "Status",
    format:(value)=>{
      if(value === null)
        return 'pending';
      if(Boolean(value) === false)
        return 'rejected';

      return 'accepted';
    }
  },
  { id: "created_at", label: "Payment Date" },
];


