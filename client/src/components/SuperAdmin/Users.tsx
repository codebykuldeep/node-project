import { useEffect, useState } from 'react';
import classes from './organization.module.css'
import { IUser } from '../../types/dataTypes';
import {RadioDataTypeForTable } from '../../types/uiTypes';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import SelectTypeRadio from '../Common/SelectTypeRadio';
import { useQuery } from '@tanstack/react-query';
import { apiCall } from '../../utils/httpMethod';
import { ColumnType } from '../../types/listTypes';
import ShowTable from '../Common/ShowTable';
import { getStatusChip } from '../Admin/Transactions/Transactions';


function Users() {
    const navigate = useNavigate();
    const [rows, setRows] = useState<IUser[]>([]);
    const { data, isFetching, isError } = useQuery({
      queryKey: ["users"],
      queryFn: () => apiCall("GET", "user"),
    });
    useEffect(() => {
      if (data && data.data.length > 0) {
        setRows(data.data);
      }
    }, [data]);
  
    function handleDataType(action: RadioDataTypeForTable) {
      const oldRows = data.data as IUser[];
      let newRows = oldRows;
      if (oldRows && action === "disabled") {
        newRows = oldRows.filter((entry) => Boolean(entry.status) === false);
      } else if (data && action === "active") {
        newRows = oldRows.filter((entry) => Boolean(entry.status) === true);
      }
      console.log(action);
  
      setRows(newRows);
    }
    function handleRowClick(row:IUser){
      const {user_id} = row;
      
      navigate(`${user_id}`);      
    }
    if (isFetching) {
      return <p>Loading Data....</p>;
    }
  
    if (isError) {
      return <p>Error Loading page</p>;
    }

  return (
    <div className={classes.container}>
        <div className={classes.heading}>
            <h2>Users</h2>
            <Link to={'add'}><Button variant='contained'>Add</Button></Link>
        </div>
        <div>
                    <SelectTypeRadio onChange={handleDataType}/>
                </div>
        {data && rows &&  rows.length> 0 && <ShowTable<IUser> columns={UserColumn} rows={rows} openModal={handleRowClick} />}
    </div>
  )
}

export default Users;



const UserColumn: ColumnType[] = [
  {
    id: "user_id",
    label: "User ID",
  },
  {
    id: "name",
    label: "Name",
  },
  {
    id: "email",
    label: "Email",
  },
  {
    id: "number",
    label: "Phone Number",
  },
  {
    id: "amount",
    label: "Deposited Amount",
    align: "center",
    format: (value) => {
      return `$ ${value}`;
    },
  },
  {
    id: "interest",
    label: "Interest Rate",
    align: "center",
    format: (value) => {
      return `${value}%`;
    },
  },
  {
    id: "organization_id",
    label: "Org Id",
  },
  {
    id: "status",
    label: "User Status",
    format: (value) => {
      let output = "active";
      if (Boolean(value) === false) {
        output = "inactive";
      }
      return getStatusChip(output);
    },
  },
];
