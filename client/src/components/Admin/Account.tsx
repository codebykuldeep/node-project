import React from 'react';
import classes from './account.module.css';
import userImage from '../../assets/user-image.jpg'
import { useSearchParams } from 'react-router-dom';
import PersonalDetails from './Account/PersonalDetails';
import UpdateAccount from './Account/UpdateAccount';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import ResetPassword from './Account/ResetPassword';


function Account() {
  const user = useSelector((state:RootState)=>state.userState.user);
  const [searchParams, setSearchParams] = useSearchParams();
  const view = searchParams.get('view')  

  function updateView(event:React.MouseEvent<HTMLButtonElement>){
    const value = (event.target as HTMLInputElement).value
    setSearchParams({view:value});
  }
  
  
  
  return (
    <div  className={classes.container}>
      <div className={classes.left}>
        <div className={classes.user}>
          <div className={classes.image}>
            <img src={userImage} alt="" />
          </div>
          <div>
            <p>{user?.name}</p>
            <p>{user?.email}</p>
          </div>
        </div>
        <div className={classes.option}>
          <button value={'details'} onClick={updateView}>Personal Details</button>
          <button value={'update'} onClick={updateView}>Update Details</button>
          <button value={'reset'} onClick={updateView}>Reset Password</button>
        </div>
      </div>
      <div className={classes.right}>
        <div>
          {!view || view === 'details' ? <PersonalDetails user={user!}/> : <></> }
          {view === 'update' ? <UpdateAccount user={user!}/> : <></> }
          {view === 'reset' ? <ResetPassword/> : <></> }
        </div>
      </div>
    </div>
  )
}

export default Account