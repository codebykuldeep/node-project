import { Button } from "@mui/material";
import React, { useState } from "react";
import classes from "./organization.module.css";
import { IOrganization } from "../../../../types/dataTypes";
import { apiCall } from "../../../../utils/httpMethod";


interface ActionButtonProps{
    organization:IOrganization;
    triggerUpdate:()=>void;
}

function ActionButton({organization,triggerUpdate}:ActionButtonProps) {
    const [action,SetAction]= useState<boolean>(Boolean(organization.status));


    async function handleAction(status:boolean) {
      console.log(status);
      
        try {
          const data = await apiCall('GET','organization/status',{
            id:organization.organization_id,
            status:status,
          })
          if(data.success){
            SetAction(prev=>!prev);
            triggerUpdate();
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
