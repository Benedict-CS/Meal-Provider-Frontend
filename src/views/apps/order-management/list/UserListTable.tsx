'use client';

import React, { useState } from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TablePagination } from '@mui/material';
import type { UsersType } from '@/types/apps/userTypes';

interface OrderData {
  order: string;
  date: string;
  customer: string;
  payment: string;
  status: string;
  method: string;
}

interface UserListTableProps {
  tableData?: UsersType[];
}


// Function to create dummy data for the table
const createData = (order: string, date: string, customer: string, payment: string, status: string, method: string): OrderData => {
  return { order, date, customer, payment, status, method };
};

const rows = [
  createData('#6979', 'Apr 15, 2023, 10:21', 'Christine Eason', 'Pending', 'Delivered', 'Credit'),
  createData('#6624', 'Apr 17, 2023, 6:43', 'Fayre Screech', 'Failed', 'Refund', 'Credit'),
  createData('#9305', 'Apr 17, 2023, 8:05', 'Pauline Pfaffe', 'Cancelled', 'Out for Delivery', 'Cash'),
  createData('#9306', 'Apr 19, 2023, 12:05', 'Christine Pfaffe', 'Refund', 'Delivered', 'Cash'),
  createData('#6979', 'Apr 15, 2023, 10:21', 'Christine Eason', 'Pending', 'Delivered', 'Credit'),
  createData('#6624', 'Apr 17, 2023, 6:43', 'Fayre Screech', 'Failed', 'Delivered', 'Credit'),
  createData('#9305', 'Apr 17, 2023, 8:05', 'Pauline Pfaffe', 'Cancelled', 'Out for Delivery', 'Cash'),
  createData('#9306', 'Apr 19, 2023, 12:05', 'Christine Pfaffe', 'Refund', 'Delivered', 'Cash'),
  createData('#6979', 'Apr 15, 2023, 10:21', 'Christine Eason', 'Pending', 'Delivered', 'Credit'),
  createData('#6624', 'Apr 17, 2023, 6:43', 'Fayre Screech', 'Failed', 'Delivered', 'Credit'),
  createData('#9305', 'Apr 17, 2023, 8:05', 'Pauline Pfaffe', 'Cancelled', 'Out for Delivery', 'Cash'),
  createData('#9306', 'Apr 19, 2023, 12:05', 'Christine Pfaffe', 'Refund', 'Delivered', 'Cash'),
  // Add more rows as needed
];
const OrderListTable: React.FC<UserListTableProps> = ({ tableData }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Order List
        </Typography>
        <TableContainer style={{ background: 'transparent', boxShadow: 'none' }} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Order</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Payment</TableCell>
                {/* <TableCell>Status</TableCell> */}
                {/* <TableCell>Method</TableCell> */}
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow
                  key={row.order}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{row.order}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.customer}</TableCell>
                  <TableCell>{row.payment}</TableCell>
                  {/* <TableCell>{row.status}</TableCell> */}
                  {/* <TableCell>{row.method}</TableCell> */}
                  <TableCell>
                    <IconButton aria-label="edit">
                      <i className="tabler-edit">Edit</i>
                    </IconButton>
                    <IconButton aria-label="delete">
                      <i className="tabler-trash">Delete</i>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[3, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </CardContent>
    </Card>
  );
};

export default OrderListTable;
