export interface ErrorType{
    status:boolean;
    message:string;
    value:string;
}


export interface ErrorState{
    [index:string]:ErrorType;
}