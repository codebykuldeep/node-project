import { useState } from 'react'
import { AlertType, SnackType } from '../types/errorTypes'

function useSnack() {
   const [snackState,setSnackState]=useState<SnackType>({open:false,status: undefined,message:''})
   function snackClose(){
    setSnackState(prev=>({...prev,open:false}));
    }
    function snackOpen(open:boolean,status:AlertType,message:string){
        setSnackState({open,status,message});
    }

    return {snackState,snackOpen,snackClose};
}

export default useSnack