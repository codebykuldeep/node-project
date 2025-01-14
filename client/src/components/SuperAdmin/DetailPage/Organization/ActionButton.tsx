import { Button } from "@mui/material";
import React, { useState } from "react";
import classes from "./organization.module.css";


interface ActionButtonProps{
    status:boolean;
}

function ActionButton({status}:ActionButtonProps) {
    const [action,SetAction]= useState<boolean>(status);
    async function handleAction() {
        SetAction(prev=>!prev);
    }
  return (
    <div className={classes.action}>
      <div>
        <h3>Actions</h3>
      </div>
      <div className={classes.action_btn}>
        {action ? 
        <Button variant="contained" sx={{background:'red'}} onClick={handleAction} >De-activate</Button> 
        : 
        <Button variant="contained" sx={{background:'green'}} onClick={handleAction}>Activate</Button>}
      </div>
    </div>
  );
}

export default ActionButton;
