export interface ErrorState{
    value:string;
    status:boolean;
    message:string;
}


export interface FormStateType{
    [index:string]:ErrorState;
}