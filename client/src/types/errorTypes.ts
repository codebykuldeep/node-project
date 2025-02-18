export interface ErrorType{
    status:boolean;
    message:string;
    value:string;
}


export interface ErrorState{
    [index:string]:ErrorType;
}

export type AlertType = 'success' | 'info' | 'warning' | 'error' | undefined;

export interface SnackType{
    open:boolean;
    status:AlertType;
    message:string;
}