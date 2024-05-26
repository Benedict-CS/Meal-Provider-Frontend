import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Rating, Button } from '@mui/material';
import ReviewEditDialog from '@components/dialogs/billing-card';

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
  const [selectedReview, setSelectedReview] = useState<ReviewData | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setReviews(reviewsData);
  }, [reviewsData]);

  const handleOpenDialog = (review: ReviewData) => {
    setSelectedReview(review);
    setDialogOpen(true);
  };

  const handleSave = (updatedReview: ReviewData) => {
    const updatedReviews = reviews.map(r => r.id === updatedReview.id ? updatedReview : r);
    setReviews(updatedReviews);
    setDialogOpen(false);
  };

  return (
    <Grid container spacing={2}>
      {reviews.map((review, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                {review.product}
              </Typography>
              <Rating value={review.rating} precision={0.1} readOnly />
              <Typography variant="body2" color="text.secondary">
                {review.review}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Review Date: {review.date}
              </Typography>
              <Button onClick={() => handleOpenDialog(review)} variant="contained">Edit Review</Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
     {selectedReview && (
  <ReviewEditDialog
    key={selectedReview.id} // This ensures the component re-mounts when a different review is selected
    review={selectedReview}
    open={dialogOpen}
    onClose={() => setDialogOpen(false)}
    onSave={handleSave}
  />
)}

    </Grid>
  );
};

export default ReviewCards;
