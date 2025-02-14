import React from 'react';
import Box from '@mui/material/Box';

import Modal from '@mui/material/Modal';
import { ITransaction } from '../../../types/dataTypes';
import classes from './transaction-detail.module.css'
import { Button } from '@mui/material';
import axios from 'axios';
import { constant } from '../../../helpers/constants';
import { getToken } from '../../../helpers/utilityFns';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface TransactionDetailProps{
    open:boolean;
    handleClose:()=>void;
    updateData:()=>void;
    data:ITransaction;
}

export default function TransactionDetail({open,handleClose,data,updateData}:TransactionDetailProps) {
    
    let Buttons:React.ReactNode;
    let paymentStatus = '';
    
    
    async function updateStatus(status:boolean) {
        const response = await axios.get(constant.SERVER+'/transactions/org/update',{
            params:{
                status:status,
                transaction_id:data.transaction_id,
            },
            headers:{
                'Authorization':getToken(),
            },
        })
        console.log('res',response);
        
        updateData();
        handleClose();
        
    }
    if( data && data.approved == null){
        Buttons = <>
        <Button onClick={()=>updateStatus(true)}>Approve</Button>
        <Button onClick={()=>updateStatus(false)}>Reject</Button>
        </> 
        paymentStatus = 'Pending';
    }



  return (
    <div>
      
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
            {data && (
                <Box component={'div'} className=''>
                <div className={classes.detail}>
                    <div className={classes.info}>
                        <div className={classes.head}>
                            <h3>Transaction Details</h3>
                        </div>
                        <div>
                        <p><span>Name</span> : {data.name}</p>
                        <p><span>User Id</span> : {data.user_id}</p>
                        <p><span>Amount</span> : {data.amount}</p>
                        <p><span>Email</span> : {data.email}</p>
                        <p><span>Phone Number</span> : {data.number}</p>
                        <p><span>Payment time</span> : {data.created_at}</p>
                        <p><span>Current Payment Status</span> : {paymentStatus || (Boolean(data.approved) ? 'Approved':'Rejected' )}</p>
                        </div>
                    </div>
                    <div className={classes.img}>
                        <img src={data.image_url} alt="" />
                    </div>
                </div>
                <div className={classes.btn_list}>
                    {Buttons}
                    <Button onClick={handleClose}>Close</Button>
                </div>
            </Box>
            )}
        </Box>
      </Modal>
    </div>
  );
}
