import { Box, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { apiCall } from '../../../utils/httpMethod'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import CardInfo from './CardInfo'
import FundInfo from './FundInfo'


//ICONS
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ReceiptIcon from '@mui/icons-material/Receipt';


function SuperHome() {
    const user = useSelector((state:RootState)=>state.userState.user)
    const {data,isError,isFetching} = useQuery({
        queryKey:['super-admin'],
        queryFn:()=>apiCall("GET","admin/super-admin-home")
    })
    console.log(data);

    if(isFetching){
        return <p>Loading....</p>
    }

    if(isError){
        return <p>Error while loading page</p>
    }
    
  return (
    <Box>
        <Typography variant='h5'>Hello, {user!.name}</Typography>
        {
            dataKeyArr.map(({header,keys})=>(
                <CardInfo key={header} data={data.data} dataKeys={keys} header={header}/>
            ))
        }
        <FundInfo data={data.data}/>
    </Box>
  )
}

export default SuperHome


const transDataKeys = [
    {
      id: "",
      icon:<ReceiptIcon color="primary" />,
      label: "Transactions Count",
    },
    {
      id: "transaction_credit",
      icon:<AttachMoneyIcon color="success" />,
      label: "Credit transactions",
    },
    {
      id: "transaction_debit",
      icon:<AttachMoneyIcon color="error" />,
      label: "Debit transactions",
    },
  ];

const OrgdataKeys = [
    {
      id: "",
      icon:<BusinessIcon color="primary" />,
      label: "Total Organizations",
    },
    {
      id: "org_active",
      icon:<BusinessIcon color="success" />,
      label: "Organizations Active",
    },
    {
      id: "org_inactive",
      icon:<BusinessIcon color="error" />,
      label: "Organizations Inactive",
    },
  ];


const UsersdataKeys = [
    {
      id: "user_active",
      icon:<PeopleIcon color="primary" />,
      label: "Total Users",
    },
    {
      id: "user_active",
      icon:<PeopleIcon color="success" />,
      label: "User Active",
    },
    {
      id: "user_inactive",
      icon:<PeopleIcon color="error" />,
      label: "User Inactive",
    },
  ];

const dataKeyArr =[
    {
        header:"Users",
        keys:UsersdataKeys
    },
    {
        header:"Organizations",
        keys:OrgdataKeys
    },
    {
        header:"Transactions",
        keys:transDataKeys
    }
];