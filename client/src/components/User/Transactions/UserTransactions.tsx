import { useState } from 'react';
import { ITransaction } from '../../../types/dataTypes';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import classes from './transactions.module.css'
import TransactionDetail from './TransactionDetail';
import ShowTable from '../../Common/ShowTable';
import { ColumnType } from '../../../types/listTypes';
import { useQuery } from '@tanstack/react-query';
import { apiCall } from '../../../utils/httpMethod';



function UserTransactions({id}:{id?:string}) {
  const user = useSelector((state:RootState)=>state.userState.user)
  const [modalData,setModalData] = useState<ITransaction | null>(null)
  const fetchId = id || user!.user_id;
  const {data,isFetching,isError,refetch} = useQuery({
    queryKey:[],
    queryFn:()=>apiCall('GET','transactions/'+fetchId,{
      type:'all'
    })
  })
  const [open, setOpen] = useState<boolean>(false)

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
  const rows = data.data;
  return (
    <div  className={classes.container}>
        <div className={classes.heading}>
            <h2>Transactions</h2>
        </div>

        {data && modalData && <TransactionDetail open={open} handleClose={handleClose} data={modalData!} updateData={refetch}/>}
        {data && rows.length> 0 && <ShowTable<ITransaction> columns={columns} rows={rows} openModal={handleOpen} />}
        {data && rows.length === 0 && <p>No transactions</p>}
    </div>
  )
}

export default UserTransactions;


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