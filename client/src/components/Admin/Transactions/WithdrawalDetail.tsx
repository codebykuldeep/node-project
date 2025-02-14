import React, { useState } from 'react';
import Box from '@mui/material/Box';

import Modal from '@mui/material/Modal';
import { ITransaction } from '../../../types/dataTypes';
import classes from './transaction-detail.module.css'
import { Button, TextField } from '@mui/material';
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

interface WithdrawalDetailProps{
    open:boolean;
    handleClose:()=>void;
    updateData:()=>void;
    data:ITransaction;
}

export default function WithdrawalDetail({open,handleClose,data,updateData}:WithdrawalDetailProps) {
    
    let Buttons:React.ReactNode;
    let paymentStatus = '';
    const [remark,setRemark] = useState<string>(data.remark || '')
    
    function handleRemark(event:React.ChangeEvent<HTMLInputElement>){
        const value = event.target.value;
        setRemark(value);
    }
    
    
    async function updateStatus(status:boolean) {
        const response = await axios.post(constant.SERVER+'/withdrawals/update',{
            status:status,
            id:data.id,
            remark:remark
        },{
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
        <Button variant='outlined'  onClick={()=>updateStatus(true)}>Approve</Button>
        <Button variant='outlined'  onClick={()=>updateStatus(false)}>Reject</Button>
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
                            <h3>Withdrawal Details</h3>
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
                        <div>
                        <TextField label="Remark"  defaultValue={remark} variant="standard" onChange={handleRemark}/>
                        </div>
                    </div>
                </div>
                <div className={classes.btn_list}>
                    {Buttons}
                    <Button variant='outlined' onClick={handleClose}>Close</Button>
                </div>
            </Box>
            )}
        </Box>
      </Modal>
    </div>
  );
}
