// Component Imports
'use client'
import ReviewCards   from '@views/apps/review-management';
import { ReviewData }   from '@views/apps/review-management';
import React from 'react';

const rolesData: ReviewData[] = [
  {
    id: 1,
    product: 'Air Jordan',
    review: 'Ut mauris Fusce consequat. Nulla nisl. Nunc nisl.',
    date: 'Apr 20, 2020',
    rating: 5,
    status: 'Published'
  },
  {
    id: 2,
    product: 'Amazon Fire TV',
    review: 'At nunc commodo placerat praesent',
    date: 'Mar 17, 2021',
    rating: 4,
    status: 'Published'
  },
  {
    id: 3,
    product: 'Apple iPad',
    review: 'Curabitur at ipsum ac tellus semper interdum.',
    date: 'Apr 21, 2020',
    rating: 3,
    status: 'Published'
  },
  {
    id: 4,
    product: 'Apple Pen',
    review: 'Curabitur at ipsum ac tellus semper interdum.',
    date: 'Apr 21, 2020',
    rating: 1,
    status: 'Published'
  }
];

const RolesApp: React.FC = () => {
  return <ReviewCards reviewsData={rolesData} />;
};

export default RolesApp;