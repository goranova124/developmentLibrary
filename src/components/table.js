import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';

function StickyHeadTable({ columns, rows }) {
 
  return (
    <TableContainer component={Paper}  >
      <Table   >
        <TableHead >
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>
                <b>
                  {column.label}
                </b>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, colIndex) => (
                <TableCell key={`${rowIndex}-${colIndex}`}>
                  
                  {`${row[column.id]}`}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default StickyHeadTable;
