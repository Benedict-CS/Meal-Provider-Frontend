// 'use client';

// import { Card, CardContent, Typography, LinearProgress, Box, Grid, Button } from '@mui/material';
// import Rating from '@mui/material/Rating';
// import { useState } from 'react';

// // Sample data for review management
// const reviewsData = [
//   {
//     id: 1,
//     product: 'Air Jordan',
//     reviewer: 'Gisela Leppard',
//     review: 'Ut mauris Fusce consequat. Nulla nisl. Nunc nisl.',
//     date: 'Apr 20, 2020',
//     rating: 5,
//     status: 'Published'
//   },
//   {
//     id: 2,
//     product: 'Amazon Fire TV',
//     reviewer: 'Tracey Ventham',
//     review: 'At nunc commodo placerat praesent',
//     date: 'Mar 17, 2021',
//     rating: 4,
//     status: 'Published'
//   },
//   {
//     id: 3,
//     product: 'Apple iPad',
//     reviewer: 'Jabez Heggs',
//     review: 'Curabitur at ipsum ac tellus semper interdum.',
//     date: 'Apr 21, 2020',
//     rating: 3,
//     status: 'Published'
//   }
// ];

// const ReviewCards = () => {
//   const [reviews, setReviews] = useState(reviewsData);

//   const handleDeleteReview = (reviewId) => {
//     setReviews(reviews.filter(review => review.id !== reviewId));
//   };




// const ReviewStatistics = () => {
//   const reviewStats = {
//     average: 4.89,
//     total: 187,
//     weekly: 5,
//     distribution: [124, 7, 12, 40, 8],
//     newReviews: 12,
//     positivePercentage: 87
//   };

//   const getColor = (index: number) => {
//     const colors = ['error', 'warning', 'info', 'primary', 'success'];
//     return colors[index] as 'error' | 'warning' | 'info' | 'primary' | 'success';
//   };

//   return (
//     <Card>
//       <CardContent>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <Typography variant="h4" component="h2" gutterBottom>
//               {reviewStats.average.toFixed(2)} <Rating value={reviewStats.average} precision={0.1} readOnly />
//             </Typography>
//             <Typography variant="subtitle1">
//               Total {reviewStats.total} reviews
//             </Typography>
//             <Typography variant="subtitle1">
//               All reviews are from genuine customers
//             </Typography>
//             <Typography color="primary">
//               +{reviewStats.weekly} This week
//             </Typography>
//             {reviewStats.distribution.map((amount, index) => (
//               <Box display="flex" alignItems="center" key={index}>
//                 <Typography variant="body2" sx={{ width: 40 }}>{5-index} Star</Typography>
//                 <LinearProgress variant="determinate" value={(amount / reviewStats.total) * 100} color={getColor(4-index)} sx={{ flexGrow: 1, mx: 1 }} />
//                 <Typography variant="body2">{amount}</Typography>
//               </Box>
//             ))}
//           </Grid>
//           {/* <Grid item xs={6}>
//             <Typography variant="h6" gutterBottom>Review Statistics</Typography>
//             <Typography>
//               12 New reviews <strong>+8.4%</strong>
//             </Typography>
//             <Typography>
//               87% Positive reviews
//             </Typography>
//           </Grid> */}
//         </Grid>
//         {/* <Divider variant="middle" sx={{ my: 2 }} />
//         <Typography variant="body1" color="text.secondary">
//           Weekly Report
//         </Typography> */}

// <Grid container spacing={4}>
//       {reviews.map(review => (
//         <Grid item xs={12} sm={6} md={4} key={review.id}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" color="text.primary">{review.product}</Typography>
//               <Rating name="read-only" value={review.rating} readOnly />
//               <Typography variant="body2" color="text.secondary">{review.review}</Typography>
//               <Typography variant="body2" color="text.secondary">Reviewed by: {review.reviewer}</Typography>
//               <Typography variant="body2" color="text.secondary">{review.date}</Typography>
//               <Typography variant="body2" color="text.secondary" style={{ marginBottom: 16 }}>Status: {review.status}</Typography>
//               <Button variant="contained" color="primary" style={{ marginRight: 8 }}
//                  href={`/reviews/edit/${review.id}`}>Edit</Button>
//               <Button variant="contained" color="secondary" onClick={() => handleDeleteReview(review.id)}>Delete</Button>
//             </CardContent>
//           </Card>
//         </Grid>
//       ))}
//     </Grid>
//       </CardContent>
//     </Card>
//   );
// };

// export default ReviewStatistics;
