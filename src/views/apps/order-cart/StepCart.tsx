'use client';
import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, Chip, CardContent } from '@mui/material';
import Link from 'next/link';
import CustomTextField from '@core/components/mui/TextField';
import { Product } from './productsData';

interface StepCartProps {
  handleNext: () => void;
  cartItems: Map<Product, number>;
  updateCartItems: (newCartItems: Map<Product, number>) => void;
}

const StepCart = ({ handleNext, cartItems, updateCartItems }: StepCartProps) => {
  // Assuming productQuantities is used to track the quantity of each product
  const [productQuantities, setProductQuantities] = useState<Map<Product, number>>(
    new Map(Array.from(cartItems).map(([product, quantity]) => [product, quantity]))
  );

  const handleQuantityChange = (product: Product, newQuantity: string) => {
    const quantity = parseInt(newQuantity);
    if (!isNaN(quantity)) {
      const newQuantities = new Map(productQuantities);
      if (quantity > 0) {
        newQuantities.set(product, quantity);
      } else {
        // newQuantities.delete(product);
      }
      setProductQuantities(newQuantities);
      updateCartItems(newQuantities);
    }
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={8} className='flex flex-col gap-4'>
        <Typography variant='h5'>My Orders</Typography>
        <div className='border rounded'>
          {Array.from(cartItems).map(([product, count], index) => (
            <div key={index} className='flex flex-col sm:flex-row items-center gap-4 p-6 relative'>
              <img height={140} width={140} src={product.image} alt={product.name} />
              <div className='flex flex-col sm:flex-row items-center sm:justify-between is-full'>
                <div className='flex flex-col items-center gap-2 sm:items-start'>
                  <Typography color='text.primary' className='font-medium'>
                    {product.name}
                  </Typography>
                  <Typography color='text.disabled'>Sold By: {product.vendor}</Typography>
                  <CustomTextField
                    type='number'
                    defaultValue={productQuantities.get(product)?.toString() || '0'}
                    onChange={(e) => handleQuantityChange(product, e.target.value)}
                  />
                </div>
                <div className='flex flex-col justify-between items-center gap-4 sm:items-end'>
                  <Typography>
                    Total: {`NT ${(productQuantities.get(product) || 0) * product.price}`}
                  </Typography>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Grid>
      <Grid item xs={12} lg={4} className='flex flex-col gap-4'>
        <Typography variant='h5'>Payment Method</Typography>
        <div className='border rounded'>


          <CardContent className='flex gap-4 flex-col'>
            <Typography color='text.primary' className='font-medium'>
              Price Details
            </Typography>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center flex-wrap justify-between'>
                <Typography color='text.primary'>Order Total</Typography>
                <Typography color='text.primary'>NT 420.00</Typography>
              </div>

              <div className='flex items-center flex-wrap justify-between'>
                <Typography color='text.primary'>Delivery Charges</Typography>
                <div className='flex items-center gap-2'>
                  <Typography color='text.disabled' className='line-through'>
                    NT 5.00
                  </Typography>
                  <Chip variant='tonal' size='small' color='success' label='Free' />
                </div>
              </div>
            </div>
          </CardContent>
          <CardContent>
            <div className='flex items-center flex-wrap justify-between'>
              <Typography color='text.primary' className='font-medium'>
                Total
              </Typography>
              <Typography color='text.primary' className='font-medium'>
                NT 420.00
              </Typography>
            </div>
          </CardContent>
        </div>
        <div className='flex justify-normal sm:justify-end xl:justify-normal'>
          <Button className='is-full sm:is-auto lg:is-full' variant='contained' onClick={handleNext} >
            Pay
          </Button>

        </div>

        <div className='flex justify-normal sm:justify-end xl:justify-normal'>
          <Button className='is-full sm:is-auto lg:is-full' variant='contained' onClick={handleNext} >
            賒賬
          </Button>

        </div>
      </Grid>
    </Grid>
  );
}

export default StepCart;
