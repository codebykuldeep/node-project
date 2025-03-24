import { ErrorState, FormStateType } from "../types/formTypes";

const error:ErrorState ={
    value:'',
    status:false,
    message:''
}
export function generateFormState<T>(data:T ,property_array:string[]){
    const errorObj:FormStateType ={};
    
    for(let key of property_array){
    
        const keyError ={...error};
        keyError.value = data[key as keyof T] as string;
        errorObj[key] =keyError
    }
    console.log('obj',errorObj);
    
    return errorObj;
}