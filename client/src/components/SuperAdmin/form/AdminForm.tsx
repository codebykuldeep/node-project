import React, { useEffect, useState } from 'react'
import InputField from './InputField';
import classes from './form.module.css';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { IOrganization } from '../../../types/dataTypes';
import { getToken } from '../../../helpers/utilityFns';
import axios from 'axios';
import { env } from '../../../helpers/constants';

function AdminForm() {
    const [organizations,setOrganizations] = useState<IOrganization[] | null>(null);
    useEffect(()=>{
        async function getData() {
            const {data} = await axios.get(env.SERVER +'/organization',{
                headers:{
                    'Authorization':getToken(),
                }
            })
            setOrganizations(data.data.organizations)
            console.log(data.data);
            
        }
        try {
            getData();
        } catch (error) {
            console.log(error);
            
        }
    },[])
  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <h1>Add a new Admin</h1>
      </div>
      <form className={classes.form} action="">
      <InputField type='text' name='name' label='Name'/>
      <InputField type='email' name='email' label='Email'/>
      <InputField type='number' name='number' label='Phone Number'/>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="Organizations">Organizations</InputLabel>
        <Select
          labelId="Organizations"
          id="Organizations"
          label="Organizations"
          
        >
          {
            organizations?.map((organization)=>(
                <MenuItem value={organization.id}>{organization.name}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
      <div>
      <Button type='button' variant='contained'>ADD</Button>
      </div>
      </form>
    </div>
  )
}

export default AdminForm;