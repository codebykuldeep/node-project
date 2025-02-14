import { IEvent, ITransaction } from "../../../types/dataTypes";

interface DateObj{
    [index:string]:null | true | false;
}

// export function allPassedDate(date:string){
//     const joinedDate = new Date(date);
//     const currentDate = new Date();
//     const passedDates:DateObj ={}
//     while(joinedDate <= currentDate){

//     }
// }

function getAllPassedDate(date:string){
    const joinedDate = new Date(date);
    const currentDate = new Date();
    const passedDates:DateObj ={}
    
    while(joinedDate <= currentDate){
        const convertedDate = joinedDate.toISOString().split('T')[0];
        passedDates[convertedDate] = false;
        joinedDate.setDate(joinedDate.getDate() + 1);
    }
    console.log(passedDates);
    return passedDates;
}

export function createTransactionObject(data:ITransaction[]){
    const transObj:DateObj ={};
    data.forEach((item)=>{
        const date = new Date(item.created_at).toISOString().split('T')[0];
        if(item.approved === null){
            transObj[date] = null;
        }
        else{
            transObj[date] = Boolean(item.approved);
        }
      })
    return transObj;
}

export function mapPassedDatesToTransactionDates(userDate:string,data:ITransaction[]){
    const passedDates:DateObj = getAllPassedDate(userDate);
    const transactionObj:DateObj = createTransactionObject(data);

    for(let key in transactionObj){
       if(passedDates[key] !== true){
        passedDates[key] = transactionObj[key];
       }
    }
    return passedDates;
}

export function getTransactionData(userDate:string,data:ITransaction[]){
    return mapPassedDatesToTransactionDates(userDate,data)
}

export function createEventArray(userDate:string,data:ITransaction[]){
    const arr:IEvent[] =[];
    
    const passedDates = mapPassedDatesToTransactionDates(userDate,data);

    for(let key in passedDates){
        let color;
        if(passedDates[key] === null){
            color = 'yellow'
          }
          else if(passedDates[key] === false){
            color = 'red';
          }
          else{
            color = 'green';
          }
          const event:IEvent = {
            start: key,
            end: key,
            display: 'background',
            backgroundColor:color
          }
          arr.push(event);
    }
    console.log(arr);
    
    return arr;
}

// export function createEventArray(data:ITransaction[]){
//     const arr:IEvent[] =[];
//     data.forEach((item)=>{
//       const date = new Date(item.created_at).toISOString().split('T')[0];
//       let color = 'green'
//       if(item.approved === null){
//         color = 'yellow'
//       }
//       else if(Boolean(item.approved) === false){
//         color = 'red';
//       }
//       const event:IEvent = {
//         start: date,
//         end: date,
//         display: 'background',
//         backgroundColor:color
//       }
//       arr.push(event);
      
//     })
//     return arr;
//   }