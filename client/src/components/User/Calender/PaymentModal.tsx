import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import PaymentForm from '../form/PaymentForm';
import { Button } from '@mui/material';
import QrCodeImage from '../../../assets/qr-code.png';
import classes from './payment-modal.module.css'
import { IOrganization } from '../../../types/dataTypes';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import axios from 'axios';
import { constant } from '../../../helpers/constants';
import { getToken } from '../../../helpers/utilityFns';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface PaymentModalProps{
    open:boolean;
    handleClose:()=>void;
    date:string;
    organization:IOrganization;
}


export default function PaymentModal({open,date,handleClose,organization}:PaymentModalProps) {
    const user = useSelector((state:RootState)=>state.userState.user)
    

  return (
    <div>
      
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <div className={classes.container}>
            <div className={classes.form}>
              <PaymentForm date={date} handleClose={handleClose} user={user!}/>
            </div>
            <div className={classes.payment}>
              <div className={classes.payment_image}>
                <img src={organization.payment_url} alt="Payment QR" />
              </div>
            </div>
          </div>

          
        </Box>
      </Modal>
    </div>
  );
}
