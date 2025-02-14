import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import classes from './calendar.module.css'
import { IEvent } from '../../../types/dataTypes';


interface CalendarProps{
  events:IEvent[];
  handleOpen:(date:string)=>void;
}

export default function Calendar({events,handleOpen}:CalendarProps) {
  const handleDateClick = (arg:DateClickArg) => {
    console.log(arg);
    
    handleOpen(arg.dateStr);
  }
  
 
  

  return (
    <div className={classes.calendar}>
      <FullCalendar
      plugins={[ dayGridPlugin ,interactionPlugin]}
      initialView="dayGridMonth"
      showNonCurrentDates={false}
      events={events}
      //eventClick={handleDateClick2}
      dateClick={handleDateClick}
      //dayCellDidMount={dayCellDidMount}
      //dayCellClassNames={dayCellClassNames}
    />
    </div>
  )
}



// const eventArray = [
//   {
//     start: '2025-01-03',
//     end: '2025-01-02',
//     display: 'background',
//     backgroundColor:'yellow'
//   },
//   {
//     start: '2025-01-02',
//     end: '2025-01-02',
//     display: 'background',
//     backgroundColor:'green'
//   },
//   {
//     start: '2025-01-01',
//     end: '2025-01-02',
//     display: 'background',
//     backgroundColor:'red'
//   }
// ]

// console.log(events);


// const eventArray = [
//   { title: 'event 1', date: '2025-01-01' },
//   { title: 'event 2', date: '2025-01-01' },
//   { title: 'event 3', date: '2025-01-02' ,backgroundColor:'green'},
//   {
//     start: '2025-01-03',
//     end: '2025-01-02',
//     display: 'background',
//     backgroundColor:'yellow'
//   },
//   {
//     start: '2025-01-02',
//     end: '2025-01-02',
//     display: 'background',
//     backgroundColor:'green'
//   },
//   {
//     start: '2025-01-01',
//     end: '2025-01-02',
//     display: 'background',
//     backgroundColor:'red'
//   }
// ]