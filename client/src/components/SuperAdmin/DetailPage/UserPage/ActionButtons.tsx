import { Button } from "@mui/material";
import React, { useState } from "react";
import classes from "./user.module.css";
import { getToken } from "../../../../helpers/utilityFns";
import axios from "axios";
import { IUser } from "../../../../types/dataTypes";
import { env } from "../../../../helpers/constants";

interface ActionButtonProps{
    data:IUser;
}

function ActionButton({data}:ActionButtonProps) {
    const [action,SetAction]= useState<boolean>(Boolean(data.status));


    async function handleAction(status:boolean) {
      try {
        const {data:res}  = await axios.get(env.SERVER +'/user/status',{
          headers:{
            'Authorization':getToken(),
          },
          params:{
            id:data.id,
            status:status,
            role:'ADMUIN'
          }
        })
        
        if(res.success){
          SetAction(prev=>!prev);
        }
      } catch (error) {
        alert('Cannot Perform action right now !');
      }
    }
  return (
    <div className={classes.action}>
      <div>
        <h3>Actions</h3>
      </div>
      <div className={classes.action_btn}>
        {action ? 
        <Button variant="contained" sx={{background:'red'}} onClick={()=>handleAction(false)} >De-activate</Button> 
        : 
        <Button variant="contained" sx={{background:'green'}} onClick={()=>handleAction(true)}>Activate</Button>}
      </div>
    </div>
  );
}

export default ActionButton;
