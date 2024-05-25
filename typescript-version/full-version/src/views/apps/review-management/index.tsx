// ReviewCards.js
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, LinearProgress, Box, Grid, Rating } from '@mui/material';

export interface ReviewData {
  id: number;
  product: string;
  review: string;
  date: string;
  rating: number;
  status: 'Published' | 'Unpublished';
}

interface ReviewCardsProps {
  reviewsData: ReviewData[];
}

const ReviewCards: React.FC<ReviewCardsProps> = ({ reviewsData }) => {
  const [reviews, setReviews] = useState<ReviewData[]>(reviewsData);

  useEffect(() => {
    setReviews(reviewsData);
  }, [reviewsData]);

  const reviewStats = {
    average: reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length || 0,
    total: reviews.length,
    weekly: 5,
    distribution: reviews.reduce((acc, review) => {
      const index = 5 - review.rating;
      acc[index] = (acc[index] || 0) + 1;
      return acc;
    }, Array(5).fill(0)),
    newReviews: 12,
    positivePercentage: (reviews.filter(review => review.rating > 3).length / reviews.length * 100) || 0
  };

  const getColor = (index: number): 'error' | 'warning' | 'info' | 'primary' | 'success' => {
    const colorMap: Record<number, 'error' | 'warning' | 'info' | 'primary' | 'success'> = {
      0: 'success', // 5 stars
      1: 'primary', // 4 stars
      2: 'info',    // 3 stars
      3: 'warning', // 2 stars
      4: 'error'    // 1 star
    };
    return colorMap[index];
  };

  return (
    <Grid container spacing={2} direction="row" justifyContent="space-between">
      <Grid item xs={12} md={12}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Average Rating: {reviewStats.average.toFixed(2)} <Rating value={reviewStats.average} precision={0.1} readOnly />
            </Typography>
            <Typography variant="subtitle1">Total Reviews: {reviewStats.total}</Typography>
            <br/>
            {reviewStats.distribution.map((amount, index) => (
              <Box display="flex" alignItems="center" key={index}>
                <Typography variant="body2" sx={{ width: 50 }}>{5 - index} Stars</Typography>
                <LinearProgress variant="determinate" value={(amount / reviewStats.total) * 100} color={getColor(index)} sx={{ flexGrow: 1, mx: 1 }} />
                <Typography variant="body2">{amount}</Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={12}>
        <Grid container spacing={2}>
          {reviews.map(review => (
            <Grid item xs={12} sm={6} key={review.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" color="text.primary">{review.product}</Typography>
                  <Rating name="read-only" value={review.rating} readOnly />
                  <Typography variant="body2" color="text.secondary">{review.review}</Typography>
                  <Typography variant="body2" color="text.secondary">Review Date: {review.date}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ReviewCards;
