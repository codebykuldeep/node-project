type IItemInSide ={
    text:string;
    icon:string;
    link:string;
  }
interface IItemMain{
    heading:string;
    items:IItemInSide[];
}

export type ISidebarProps = IItemMain[];



export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'center' | "left";
  format?: <T,U>(value: T) => U;
  actionElement?:React.ReactNode;
}


export type RadioDataTypeForTable = 'all' | 'disabled' | 'active';

export type TransactionTypeForTable = 'all' |  'pending' | 'approved' | 'rejected';