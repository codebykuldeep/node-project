import React from "react";
import classes from "./personal-detail.module.css";
import { IUser } from "../../../types/dataTypes";

interface Props {
  user: IUser;
}

function PersonalDetails({ user }: Props) {
  return (
    <>
      <div className={classes.heading}>
        <h1>Personal Information</h1>
      </div>
      <div className={classes.detail}>
      <div className={classes.card}>
          <h3>Id</h3>
          <h4>{user.id}</h4>
        </div>
        <div className={classes.card}>
          <h3>Name</h3>
          <h4>{user.name}</h4>
        </div>
        <div className={classes.card}>
          <h3>Email</h3>
          <h4>{user.email}</h4>
        </div>
        <div className={classes.card}>
          <h3>Phone Number</h3>
          <h4>{user.number}</h4>
        </div>
        {
          user.organization_id && (
            <div className={classes.card}>
              <h3>Organization Id</h3>
              <h4>{user.organization_id}</h4>
            </div>
          )
        }
      </div>
    </>
  );
}

export default PersonalDetails;
