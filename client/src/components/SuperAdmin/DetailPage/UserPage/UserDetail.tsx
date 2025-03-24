import React from 'react'
import { useParams } from 'react-router-dom';
import classes from './user.module.css'
import ActionButton from './ActionButtons';
import { useQuery } from '@tanstack/react-query';
import { apiCall } from '../../../../utils/httpMethod';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import UserData from './DisplayData/UserData';
import FundInfo from '../../HomePage/FundInfo';
import UserTransactions from '../../../User/Transactions/UserTransactions';


function UserDetail() {
    const user = useSelector((state:RootState)=>state.userState.user)
    const {id} = useParams();
    const {data,isFetching,isError} = useQuery({
      queryKey:['user',id],
      queryFn:()=>apiCall('GET','admin/user-detail',{
        user_id:id,
        organization_id:user!.organization_id
      })
    })
    

    if(isFetching){
      return <p>Loading....</p>
    }
    if(isError){
      return <p>Error while loading...</p>
    }
    console.log(data);
    
    
  return (
    <div>
        {
            data && user && (
                <div className={classes.container}>
                <div className={classes.heading}>
                    <h1>User Details</h1>
                </div>
                 <UserData user={data.data.user}/>
                 <ActionButton data={user} role='USER' select='user_id'/>
                 <FundInfo data={data.data.data}/>
                 <UserTransactions id={data.data.user.user_id}/>
                </div>
            )
        }
    </div>
  )
}

export default UserDetail;


// const transDataKeys = [
//   {
//     id: "",
//     label: "Transactions Count",
//   },
//   {
//     id: "transaction_credit",
//     label: "Credit transactions",
//   },
//   {
//     id: "transaction_debit",
//     label: "Debit transactions",
//   },
// ];


// "credit_pending": "300",
//             "credit_approved": "200",
//             "credit_rejected": null,
//             "debit_pending": "50",
//             "debit_approved": "20",
//             "debit_rejected": null,
//             "transaction_credit": "3",
//             "transaction_debit": "2"