import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Column } from '../../../types/uiTypes';
import { IOrganization, ITransaction, IUser } from '../../../types/dataTypes';

interface DataTableProps{
  columns:readonly Column[],
  rows:IOrganization[] | IUser[] | ITransaction[],
  handleOpen?:(data:ITransaction)=>void;
}

export default function StickyHeadTable({columns,rows,handleOpen}:DataTableProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function handleOpenModal(data:ITransaction){
    if(handleOpen!== undefined){
      handleOpen(data)
    }
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column,index) => (
                <TableCell
                  key={index}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row,index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index} onClick={()=>handleOpenModal(row as ITransaction)}>
                    {columns.map((column) => {
                      if(column.id === 'action'){
                        return(
                          <TableCell key={column.id} align={column.align}>
                          {column.actionElement}
                        </TableCell>
                        )
                      }
                      let value = row[column.id]; 
                      if(column.id === 'approved'){
                        value = row[column.id] === null ? 'pending' : (Boolean(row[column.id]) ? 'approved' : 'rejected');
                      }
                      
                      
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
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
