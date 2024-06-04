'use client';

import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography, Button, Grid, Box } from '@mui/material';
import { Product, initialProducts } from './productsData';
import ToCart from '@core/components/to-cart'

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <Card sx={{ maxWidth: 345, m: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <CardMedia
        component="img"
        height="194"
        image={product.image}
        alt={product.name}
        sx={{ objectFit: 'contain' }} // Ensures the image is not cropped
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography> */}
        <Typography variant="body1">
          Price: {product.price}
        </Typography>
        {/* <Typography variant="body1">
          Available: {product.inStock ? 'In Stock' : 'Out of Stock'}
        </Typography> */}
      </CardContent>
      <CardActions>

      <Button className='is-full sm:is-auto lg:is-full' variant='contained' onClick={() => onAddToCart(product)} >
        Add to Cart
      </Button>
          
      </CardActions>
    </Card>
  );
};

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const handleAddToCart = (product: Product) => {
    setCartItems(prevItems => [...prevItems, product]);
    console.log('Added to cart:', product.name);
  };

  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} justifyContent="flex-start"> {/* Aligns items to the left */}
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} onAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Box>
    
    <ToCart className='mui-fixed'>
      <Button variant='contained' className='is-10 bs-10 rounded-full p-0 min-is-0 flex items-center justify-center'>
        <i className='tabler-shopping-cart' />
      </Button>
    </ToCart>
    </>
  );
};

export default ProductManagement;
