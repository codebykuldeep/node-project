import { ErrorState } from "../types/errorTypes";

function emailValidation(value:string):[string,boolean]{
    if(value.trim()===''){
        return ['This field is required',true];
    }

    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!pattern.test(value)){
        return ['Enter a valid Email',true];
    }
    return ['',false];
}

function passwordValidation(value:string):[string,boolean]{
    value =value.trim();
    if(value ===''){
        return ['This field is required',true];
    }
    if(value !=='' &&  value.length < 6){
        return ['Min length should be 6',true];
    }
    return ['',false];
}


function fieldValidation(value:string):[string,boolean]{
    if(!value){
        return ['This field is required',true];
    }
    
    if(String(value).trim() ===''){
        return ['This field is required',true];
    }
    console.log('check',value);
    
    return ['',false];
}


export function validation(title:string,value:string):[string,boolean]{
   
    title = title.toLowerCase();
    if(title === 'email'){
        return emailValidation(value);
    }

    if(title === 'password'){
        return passwordValidation(value);
    }
    if(title === 'image' || title==='video'){
        
        if(value  === ''){
            return [`Please select a ${title}`,true];
        }
        return ['',false];
    }
    if(title === 'number'){
        
        if(Number(value) <  0 || value.length !== 10){
            return [`Please enter valid number`,true];
        }
        return ['',false];
    }
    if(title === 'amount'){
        if(!value || Number(value) < 0){
            return [`Please enter valid amount`,true];
        }
        return ['',false];
    }
    
    return fieldValidation(value);
}

export function checkValidFormState(formState:ErrorState){
    for(const key in formState){
     if(formState[key].status || !formState[key].value){
        console.log(formState[key]);
        
        return false;
     }  
    }
    return true;
}

export function populateFormState(formState:ErrorState){
    for(const key in formState){
         const [msg,status] = validation(key,formState[key].value);
         formState ={
            ...formState,
            [key]:{
                message:msg,
                status:status,
                value:formState[key].value
            }
         }
    }
    return formState;
}

// export function validateState(state:ErrorStateType ){
//     for(const key in state){
//         const value = state[key as keyof ErrorStateType ]?.value as string
       
//         const [msg, status] = validation(key,value);
//         state = { ...state, [key]: {
//             status:status,
//             message:msg,
//             value:value
//         } };
//     }
//     return state;
// }

// export function serverValidation(user:UserType|uploadDataType){
//     const error:ErrorType={};
//     for(const [key,value] of Object.entries(user)){
//         const [msg,status] =validation(key,value)
//         if(status){
//             error[key] =msg;
//         }
//     }
//     return error;
// }





// export function validateFormState(state:VideoFormType ){
//     for(const key in state){
//         const value = state[key as keyof VideoFormType ]?.value as string
       
//         const [msg, status] = validation(key,value);
//         state = { ...state, [key]: {
//             status:status,
//             message:msg,
//             value:value
//         } };
//     }
//     return state;
// }

// export function validateResult(state:VideoFormType){
//     let result = true;
//     for(const key in state){
//         const status = state[key as keyof VideoFormType ]?.status as boolean;
//         const value = state[key as keyof VideoFormType ]?.value as string;
//         result =result && !status && Boolean(value)
//     }
//     return result;
// }

// export function errorResult(state:ErrorStateType){
//     let result = true;
//     for(const key in state){
//         const status = state[key as keyof ErrorStateType ]?.status as boolean;
//         const value = state[key as keyof ErrorStateType ]?.value as string;
//         result =result && !status && Boolean(value)
//     }
//     return result;
// }