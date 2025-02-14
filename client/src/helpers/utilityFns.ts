import { IUser } from "../types/dataTypes";

export function getToken(){
    if(localStorage.getItem('token'))
         return 'Bearer '+localStorage.getItem('token') ;
    else
        return '';
}

export function setToken(token:string){
    return localStorage.setItem('token',token);
}

export function removeToken(){
    return localStorage.removeItem('token');
}

export function getDashboardPath(user:IUser){
    const role = user.role;
    switch(role){
        case 'SUPER_ADMIN':return 'super-admin';
        case 'ADMIN':return 'admin';
        default: return 'user';
    }
}