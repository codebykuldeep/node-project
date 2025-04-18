// import  React, { useState } from 'react';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import { ColumnType } from '../../types/listTypes';




// interface DataTableProps<T>{
//   columns:ColumnType[],
//   rows:T[],
//   openModal?:(row:T)=>void;
// }

// export default function ShowTable<T>({columns,rows,openModal}:DataTableProps<T>) {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
  
//   const handleChangePage = (event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   function handleRow(row:any){
//     if(openModal){
//       openModal(row);
//     }
//   }

//   return (
//     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//       <TableContainer sx={{ maxHeight: 440,width:'100%', }}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.id}
//                   align={column.align}
//                   style={{ minWidth: column.minWidth }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((row,ind) => {
//                 return (
//                   <TableRow hover role="checkbox" tabIndex={-1} key={ind} onClick={()=>handleRow(row)}>
//                     {columns.map((column) => {
//                       const value = row[column.id as keyof T] as string;
//                       return (
//                         <TableCell key={column.id} id={column.id} align={column.align}>
//                           {column.format
//                             ? column.format(value)
//                             : value}
//                         </TableCell>
//                       );
//                     })}
//                   </TableRow>
//                 );
//               })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 100]}
//         component="div"
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Paper>
//   );
// }


import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { ColumnType } from '../../types/listTypes';

interface DataTableProps<T> {
  columns: ColumnType[];
  rows: T[];
  openModal?: (row: T) => void;
}

export default function ShowTable<T>({ columns, rows, openModal }: DataTableProps<T>) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRow = (row: any) => {
    if (openModal) {
      openModal(row);
    }
  };

  

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: '0px 4px 20px rgba(0,0,0,0.1)', borderRadius: 2 }}>
      <TableContainer sx={{ maxHeight: 440, width: '100%' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f4f4f4' }}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', color: '#333' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, ind) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={ind}
                  onClick={() => handleRow(row)}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#e0f7fa',
                    },
                  }}
                >
                  {columns.map((column) => {
                    let value = row[column.id as keyof T] as string;
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
