'use client';

import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography, Button, Grid, Box, Badge } from '@mui/material';
import ToCart from '@core/components/to-cart'; // Import ToCart component
import { Product, initialProducts } from './productsData';

interface StepOrderProps {
  handleNext: () => void;
  cartItems: Map<Product, number>;
  updateCartItems: (newCartItems: Map<Product, number>) => void;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  count: number;
}

const ProductCard = ({ product, onAddToCart, count }: ProductCardProps) => {
  return (
    <Card sx={{ maxWidth: 345, m: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <CardMedia
        component="img"
        height="194"
        image={product.image}
        alt={product.name}
        sx={{ objectFit: 'contain' }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body1">
          Price: {product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Badge
          color='error'
          className='cursor-pointer is-full sm:is-auto lg:is-full'
          variant='standard'
          badgeContent={count}
          overlap='circular'
          sx={{
            '& .MuiBadge-badge': {
              top: -6,
              right: -3,
              boxShadow: 'var(--mui-palette-background-paper) 0px 0px 0px 2px',
              width: '16px',
              height: '16px',
              fontSize: '10px'
            }
          }}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Button className='is-full sm:is-auto lg:is-full' variant='contained' onClick={() => onAddToCart(product)}>
            Add to Cart
          </Button>
        </Badge>
      </CardActions>
    </Card>
  );
};

const StepOrder = ({ handleNext, cartItems, updateCartItems }: StepOrderProps) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const cartCount = Array.from(cartItems.values()).reduce((acc, count) => acc + count, 0);

  const handleAddToCart = (product: Product) => {
    const count = cartItems.get(product) || 0;
    updateCartItems(new Map(cartItems.set(product, count + 1)));
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} justifyContent="flex-start">
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} onAddToCart={handleAddToCart} count={cartItems.get(product) || 0} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <ToCart className='mui-fixed'>
        <Button variant='contained' className='is-10 bs-10 rounded-full p-0 min-is-0 flex items-center justify-center' onClick={handleNext}>
          <Badge
            color='error'
            className='cursor-pointer'
            variant='standard'
            badgeContent={cartCount}
            overlap='circular'
            sx={{
              '& .MuiBadge-badge': {
                top: -6,
                right: -3,
                boxShadow: 'var(--mui-palette-background-paper) 0px 0px 0px 2px',
                width: '16px',
                height: '16px',
                fontSize: '10px'
              }
            }}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <i className='tabler-shopping-cart' />
          </Badge>
        </Button>
      </ToCart >
    </>
  );
};

export default StepOrder;
