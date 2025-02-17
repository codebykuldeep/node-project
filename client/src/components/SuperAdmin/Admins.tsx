import { useEffect, useState } from "react";
import classes from "./organization.module.css";
import { IUser } from "../../types/dataTypes";
import { RadioDataTypeForTable } from "../../types/uiTypes";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import SelectTypeRadio from "../Common/SelectTypeRadio";
import { ColumnType } from "../../types/listTypes";
import ShowTable from "../Common/ShowTable";
import { apiCall } from "../../utils/httpMethod";
import { useQuery } from "@tanstack/react-query";

function Admins() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<IUser[]>([]);
  const { data, isFetching, isError } = useQuery({
    queryKey: ["admin"],
    queryFn: () => apiCall("GET", "admin"),
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
      newRows = oldRows.filter(
        (entry) => Boolean(entry.admin_status) === false
      );
    } else if (oldRows && action === "active") {
      newRows = oldRows.filter((entry) => Boolean(entry.admin_status) === true);
    }
    console.log(action);

    setRows(newRows);
  }
  function handleRowClick(row:IUser){
    const {admin_id} = row;
    
    navigate(`${admin_id}`);      
  }

  if(isFetching){
    return <p>Loading Data....</p>
  }

  if(isError){
    return <p>Error while loading page</p>
  }

  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <h2>Admins</h2>
        <Link to={"add"}>
          <Button variant="contained">Add</Button>
        </Link>
      </div>
      <div>
        <SelectTypeRadio onChange={handleDataType} />
      </div>
      {data && rows.length > 0 && (
        <ShowTable<IUser> columns={AdminColumn} rows={rows} openModal={handleRowClick} />
      )}
    </div>
  );
}

export default Admins;

const AdminColumn: ColumnType[] = [
  {
    id: "admin_id",
    label: "Admin ID",
  },
  {
    id: "admin_name",
    label: "Name",
  },
  {
    id: "email",
    label: "Email",
  },
  {
    id: "admin_status",
    label: "Admin Status",
    format: (value) => {
      console.log(value);
      
      if (Boolean(value) ) {
        return "active";
      }
      return "inactive";
    },
  },
  {
    id: "org_name",
    label: "Org Name",
  },
  {
    id: "org_status",
    label: "Org Status",
    format: (value) => {
      if (Boolean(value) === false) {
        return "inactive";
      }
      return "active";
    },
  },
];
