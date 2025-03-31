import {useState } from 'react';
import { ITransaction } from '../../../types/dataTypes';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import classes from '../org-user.module.css'
import TransactionDetail from './TransactionDetail';
import { useQuery } from '@tanstack/react-query';
import { apiCall } from '../../../utils/httpMethod';
import { ColumnType } from '../../../types/listTypes';
import ShowTable from '../../Common/ShowTable';
import NoDataInTable from '../../Common/MessageUI/NoDataInTable';
import { Chip } from '@mui/material';



function Transactions({id}:{id?:string}) {
  const user = useSelector((state:RootState)=>state.userState.user)
  const [modalData,setModalData] = useState<ITransaction | null>(null)
  const fetchId = id || user!.organization_id;
  const {data,isFetching,isError,refetch} = useQuery({
    queryKey:[],
    queryFn:()=>apiCall('GET','transactions/org/'+ fetchId,{
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

        {data && <TransactionDetail open={open} handleClose={handleClose} data={modalData!} updateData={refetch}/>}
        {data && rows.length> 0 && <ShowTable<ITransaction> columns={columns} rows={rows} openModal={handleOpen} />}
        {data && rows.length === 0 && <NoDataInTable />}
    </div>
  )
}

export default Transactions;


const columns: ColumnType[] = [
  { id: "user_id", label: "User ID" },
  { id: "paid_amount", label: "Amount"},
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
      let output = 'accepted';
      if(value === null)
        output='pending';
      if(Boolean(value) === false)
        output='rejected';

      return getStatusChip(output)
    }
  },
  { id: "created_at", label: "Payment Date" },
];

export const getStatusChip = (status: string) => {
    let color: "success" | "warning" | "error" = "success";
    if (status === "accepted" ||status === "active") color = "success";
    else if (status === "rejected" || status === "inactive") color = "error";
    else color = "warning";

    return <Chip label={status} color={color} size="small" />;
  };