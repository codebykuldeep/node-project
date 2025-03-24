import React from "react";
import OrgPage from "../../Common/OrgPage/OrgPage";
import UserCard from "./DisplayData/UserCard";
import { IOrganization } from "../../../types/dataTypes";
import FundCard from "./DisplayData/FundCard";
import BalanceCard from "./DisplayData/BalanceCard";
interface Props{
  data:{
    organization:IOrganization;
    details:{
      [index:string]:string;
    }
  }
}

function ShowHomeData({data}:Props) {
  const organization = data.organization;
  const details = data.details;
  return (
    <>
      <OrgPage organization={organization} />
      <UserCard details={details} />
      <FundCard details={details}/>
    </>
  );
}

export default ShowHomeData;
