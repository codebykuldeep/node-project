import { Button } from "@mui/material";
import React, { useState } from "react";
import classes from "./organization.module.css";
import { constant } from "../../../../helpers/constants";
import { IOrganization } from "../../../../types/dataTypes";
import axios from "axios";
import { getToken } from "../../../../helpers/utilityFns";


interface ActionButtonProps{
    organization:IOrganization;
    triggerUpdate:()=>void;
}

function ActionButton({organization,triggerUpdate}:ActionButtonProps) {
    const [action,SetAction]= useState<boolean>(Boolean(organization.status));


    async function handleAction(status:boolean) {
      console.log(status);
      
        try {
          const {data}  = await axios.get(constant.SERVER +'/organization/status',{
            headers:{
              'Authorization':getToken(),
            },
            params:{
              id:organization.id,
              status:status,
            }
          })
          
          if(data.success){
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
