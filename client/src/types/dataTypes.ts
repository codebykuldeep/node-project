export interface IUser{
    name:string,
    email:string,
    number:string,
    role:string,
    [index:string]:string;
}

export interface IOrganization{
    name:string;
    description:string;
    status:string,
    payment_id:string;
    payment_url:string;
    [index:string]:string;
}
