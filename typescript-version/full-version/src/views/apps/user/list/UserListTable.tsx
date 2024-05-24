'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, IconButton, TablePagination } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

// Dummy data for the table
const createData = (order, date, customer, payment, status, method) => {
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

const OrderListTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
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
                <TableCell>Status</TableCell>
                <TableCell>Method</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow
                  key={row.order}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.order}
                  </TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.customer}</TableCell>
                  <TableCell>{row.payment}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.method}</TableCell>
                  <TableCell>
                    <IconButton aria-label="edit">
                      {/* <EditIcon /> */}
                      <i className="tabler-edit">Edit</i>
                    </IconButton>
                    <IconButton aria-label="delete">
                    <i className="tabler-trash">Delete</i>
                      {/* <DeleteIcon /> */}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[3, 10, 20]}
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
