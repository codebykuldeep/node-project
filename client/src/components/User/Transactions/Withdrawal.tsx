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
import classes from './transactions.module.css'
import TransactionDetail from './TransactionDetail';
import { useFetch } from '../../../helpers/useFetch';
import Loading from '../../Common/Loading';

const columns: readonly Column[] = [
    { id: 'user_id', label: 'User ID', minWidth: 150,},
    { id: 'amount', label: 'Amount', minWidth: 150 },
    {
        id: 'approved',
        label: 'Status',
        minWidth: 170,
        align: 'center',
    },
    { id: 'created_at', label: 'Withdrawal Req Date', minWidth: 150 },
  ];

function Withdrawal() {
  const user = useSelector((state: RootState) => state.userState.user);
  const [modalData, setModalData] = useState<ITransaction | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [fetchData, loading, error, update] = useFetch(
    "/withdrawals/" + user!.id
  );
  let data: ITransaction[];
  if (!error) {
    data = fetchData as ITransaction[];
  } else {
    return <p>Error While Loading Page</p>;
  }

  const handleOpen = (transaction: ITransaction) => {
    setModalData(transaction);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
    

  if(loading){
    return <Loading/>
  }

  return (
    <div  className={classes.container}>
        <div className={classes.heading}>
            <h2>Withdrawal History</h2>
        </div>
        {data && data.length === 0 && <p>No withdrawals history</p>}
        {data && <TransactionDetail open={open} handleClose={handleClose} data={modalData!} updateData={update as ()=>void}/>}
        {data && data.length> 0 && <DataTable columns={columns} rows={data} handleOpen={handleOpen}/>}
    </div>
  )
}

export default Withdrawal;