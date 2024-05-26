import React, { useState } from 'react';
import { Dialog, DialogContent, DialogActions, Button, Typography, TextField, Rating } from '@mui/material';
import type { ReviewData } from '@views/apps/review-record'; // Adjust path as necessary


export interface ReviewEditDialogProps {
  review: ReviewData;
  open: boolean;
  onClose: () => void;
  onSave: (review: ReviewData) => void;
}

const ReviewEditDialog: React.FC<ReviewEditDialogProps> = ({ review, open, onClose, onSave }) => {
  const [editedReview, setEditedReview] = useState(review);

  
  const handleRatingChange = (event: React.ChangeEvent<{}>, newValue: number | null) => {
    if (newValue !== null) {
      setEditedReview({ ...editedReview, rating: newValue });
    }
  };

  const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedReview({ ...editedReview, review: event.target.value });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <Typography gutterBottom>Rate the Product</Typography>
        <Rating
          name="simple-controlled"
          value={editedReview.rating}
          onChange={handleRatingChange}
        />
        <TextField
          fullWidth
          multiline
          margin="dense"
          label="Your Review"
          type="text"
          value={editedReview.review}
          onChange={handleReviewChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onSave(editedReview)} color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewEditDialog;
