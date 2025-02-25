import { Box, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { apiCall } from '../../../utils/httpMethod'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import CardInfo from './CardInfo'
import FundInfo from './FundInfo'

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
      label: "Transactions Count",
    },
    {
      id: "transaction_credit",
      label: "Credit transactions",
    },
    {
      id: "transaction_debit",
      label: "Debit transactions",
    },
  ];

const OrgdataKeys = [
    {
      id: "",
      label: "Total Organizations",
    },
    {
      id: "org_active",
      label: "Organizations Active",
    },
    {
      id: "org_inactive",
      label: "Organizations Inactive",
    },
  ];


const UsersdataKeys = [
    {
      id: "user_active",
      label: "Total Users",
    },
    {
      id: "user_active",
      label: "User Active",
    },
    {
      id: "user_inactive",
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