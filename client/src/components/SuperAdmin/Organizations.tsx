import { useEffect, useState } from "react";
import classes from "./organization.module.css";
import { RadioDataTypeForTable } from "../../types/uiTypes";
import { IOrganization } from "../../types/dataTypes";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import SelectTypeRadio from "../Common/SelectTypeRadio";
import { ColumnType } from "../../types/listTypes";
import ShowTable from "../Common/ShowTable";
import { useQuery } from "@tanstack/react-query";
import { apiCall } from "../../utils/httpMethod";
import { getStatusChip } from "../Admin/Transactions/Transactions";

function Organizations() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<IOrganization[]>([]);
  const { data, isFetching, isError } = useQuery({
    queryKey: ["organization"],
    queryFn: () => apiCall("GET", "organization"),
  });
  useEffect(() => {
    if (data && data.data.length > 0) {
      setRows(data.data);
    }
  }, [data]);

  function handleDataType(action: RadioDataTypeForTable) {
    const oldRows = data.data as IOrganization[];
    let newRows = oldRows;
    if (oldRows && action === "disabled") {
      newRows = oldRows.filter((entry) => Boolean(entry.status) === false);
    } else if (data && action === "active") {
      newRows = oldRows.filter((entry) => Boolean(entry.status) === true);
    }
    console.log(action);

    setRows(newRows);
  }
  if (isFetching) {
    return <p>Loading Data....</p>;
  }

  function handleRowClick(row:IOrganization){
    console.log(row);
    const id = row.organization_id
    navigate(`${id}`);
  }

  if (isError) {
    return <p>Error Loading page</p>;
  }
  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <h2>Organisations</h2>
        <Link to={"add"} className="main-btn">
          <Button variant="contained">Add</Button>
        </Link>
      </div>
      <div>
        <SelectTypeRadio onChange={handleDataType} />
      </div>
      {data && rows && (
        <ShowTable<IOrganization> columns={OrganizationColumn} rows={rows} openModal={handleRowClick} />
      )}
    </div>
  );
}

export default Organizations;

export const OrganizationColumn: ColumnType[] = [
  {
    id: "organization_id",
    label: "Org ID",
  },
  {
    id: "name",
    label: "Name",
  },
  {
    id: "description",
    label: "Description",
  },
  {
    id: "status",
    label: "Status",
    format: (value) => {
      let output = "active";
      if (Boolean(value) === false) {
        output =  "inactive";
      }
      return getStatusChip(output) ;
    },
  },
];
