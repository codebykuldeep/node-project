import { Button } from "@mui/material";
import React, { useState } from "react";
import classes from "./user.module.css";
import { IUser } from "../../../../types/dataTypes";
import { useMutation } from "@tanstack/react-query";
import { apiCall } from "../../../../utils/httpMethod";

interface ActionButtonProps{
    data:IUser;
    role:string;
    select:string;
}
interface MutateArgs{
  params:{
    id:string | number;
    status:boolean;
    role:string;
  }
}

function ActionButton({data,role,select}:ActionButtonProps) {
    const [action,SetAction]= useState<boolean>(Boolean(data.status));
    const {mutate,isPending} = useMutation({
      mutationFn:({params}:MutateArgs)=>apiCall('GET','user/status',params),
      onSuccess:(data)=>{
        console.log(data);
        
      }
    })

    async function handleAction(status:boolean) {
      console.log('data',select,data,data[select]);
      
      const params ={
        id:data[select],
        status:status,
        role:role
      };
      mutate({params})
      SetAction(status);
    }

  return (
    <div className={classes.action}>
      <div>
        <h3>Actions</h3>
      </div>
      <div className={classes.action_btn}>
        {action ? 
        <Button variant="contained" sx={{background:'red'}} onClick={()=>handleAction(false)}  loading={isPending} loadingPosition="end">De-activate</Button> 
        : 
        <Button variant="contained" sx={{background:'green'}} onClick={()=>handleAction(true)} loading={isPending} loadingPosition="end">Activate</Button>}
      </div>
    </div>
  );
}

export default ActionButton;
