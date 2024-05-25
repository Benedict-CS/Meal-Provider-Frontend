"use client"

import React, { ChangeEvent, useState } from 'react';
import { Card, CardHeader, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { initialProducts, Product } from './data';

interface ProductFormProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (formData: Product) => void;
  product: Product | null;
}

const ProductForm = ({ open, handleClose, handleSubmit, product }: ProductFormProps) => {
  const [formData, setFormData] = useState<Product>(product || {
    id: '',
    name: '',
    price: '',
    description: '',
    vendor: '',
    inStock: false,
    category: '',
    image: '',
    status: 'Sold Out',
    quantity:''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent: ProgressEvent<FileReader>) => {
        const result = loadEvent.target?.result;
        setFormData(prev => ({ ...prev, image: result ? result as string : prev.image }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{product?.id ? 'Edit Product' : 'Add Product'}</DialogTitle>
      <DialogContent>
        <TextField margin="dense" name="name" label="Name" type="text" fullWidth variant="outlined" value={formData.name} onChange={handleChange} />
        <TextField margin="dense" name="price" label="Price" type="text" fullWidth variant="outlined" value={formData.price} onChange={handleChange} />
        <TextField margin="dense" name="category" label="Category" type="text" fullWidth variant="outlined" value={formData.category} onChange={handleChange} />
        <input accept="image/*" type="file" onChange={handleFileChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={() => handleSubmit(formData)}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

const DashboardCRM = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [openForm, setOpenForm] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleOpenForm = (product: Product | null = null) => {
    setSelectedProduct(product);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleOpenImage = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setOpenImage(true);
  };

  const handleCloseImage = () => {
    setOpenImage(false);
  };

  const handleSubmit = (newData: Product) => {
    if (newData.id) {
      setProducts(products.map(p => p.id === newData.id ? newData : p));
    } else {
      newData.id = Date.now().toString();
      setProducts([...products, newData]);
    }
    handleCloseForm();
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  return (
    <Card >
      <CardHeader
        title="Order Management"
        action={
          <IconButton color="primary" onClick={() => handleOpenForm()}>
            <i className="tabler-plus">Add</i>
          </IconButton>
        }
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell align="center">Category</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map(product => (
            <TableRow key={product.id}>
              <TableCell onClick={() => handleOpenImage(product.image)}>
                <img src={product.image} alt={product.name} style={{ width: "50px", height : "50px", cursor: 'pointer', borderRadius: '50%' }} />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell align="center">{product.category}</TableCell>
              <TableCell align="center">{product.quantity}</TableCell>
              <TableCell align="center">{product.status}</TableCell>
              <TableCell align="center">
                <IconButton color="info" onClick={() => handleOpenForm(product)}>
                  <i className="tabler-edit">Edit</i>
                </IconButton>
                <IconButton color="secondary" onClick={() => handleDeleteProduct(product.id)}>
                  <i className="tabler-trash">Delete</i>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {openForm && (
        <ProductForm
          open={openForm}
          handleClose={handleCloseForm}
          handleSubmit={handleSubmit}
          product={selectedProduct}
        />
      )}
      {openImage && (
        <Dialog open={openImage} onClose={handleCloseImage}>
          <DialogTitle>Image Preview</DialogTitle>
          <DialogContent>
            <img src={selectedImage} alt="Zoomed In" style={{ maxWidth: '100%' }} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseImage}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Card>
  );
};

export default DashboardCRM

// 這頁
