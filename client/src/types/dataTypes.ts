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
    organization_id:string;
    [index:string]:string;
}


export interface ITransaction{
    amount:string;
    approved:string;
    created_at:string;
    id:string;
    image_url:string;
    organization_id:string;
    user_id:string;
    [index:string]:string;
}


export interface IEvent{
    start: string,
    end: string,
    display: string,
    backgroundColor:string
}


export interface SerachResultResponse{
    organizations:IOrganization[],
    users:IUser[],
    admins:IUser[]
}