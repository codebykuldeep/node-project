import React, { useState } from 'react'
import classes from './sidebar.module.css'
import ArrowBack from '@mui/icons-material/ArrowBackIos';
import ArrowForward from '@mui/icons-material/ArrowForwardIos';
import { Link, useLocation } from 'react-router-dom';
import { ISidebarProps } from '../../../types/uiTypes';
import { Divider } from '@mui/material';



interface SideBarProps{
    list:ISidebarProps
}

function Sidebar({list}:SideBarProps) {
  const {pathname} = useLocation();
  const [open, setOpen] = useState(false);
  function handleSideBar() {
    setOpen((prev) => !prev);
  }
  
  const routeList = pathname.split('/');
  const route = routeList[routeList.length -1];
  
  return (
    <div
      className={!open ? classes.sidebar_open : classes.sidebar_close }
    >
      <div className={classes.open_btn}>
      <button onClick={handleSideBar}>{open ?  <ArrowForward/> : <ArrowBack/>}</button>
      </div>
      <div className={classes.item_container}>
        {list.map(({ heading ,items}) => (
          <div className={classes.item_box} key={heading}>
          {!open ? <div className={classes.item_head}>{heading}</div> : <Divider className={classes.divide}/>}
          {
            items.map(({icon,link,text})=>(
                <Link to={link!} key={text} className={ classes.item} >
                <span className={classes.icon}>{icon}</span>
                {!open && <span>{text}</span>}
              </Link>
              ))
          }
          </div> 
        ))}
      </div>
    </div>
  );
}

export default Sidebar