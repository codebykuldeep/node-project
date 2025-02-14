export interface IAxiosLoginReq{
    email:string,
    password:string,
}


export interface Response<T>{
    status:string;
    data:T;
    success:boolean;
}

export interface DataResponse<T>{
    data:Response<T>;
}


export interface Iparams{
    [index:string]:string;
}