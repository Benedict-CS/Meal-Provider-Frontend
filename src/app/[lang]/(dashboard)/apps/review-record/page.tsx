// Component Imports
'use client'
import ReviewCards   from '@views/apps/review-record';
import { ReviewData }   from '@views/apps/review-record';
import React from 'react';

const rolesData: ReviewData[] = [
  {
    id: 1,
    product: '蜜汁紅燒五花',
    review: '尚未評論',
    date: 'Apr 20, 2020',
    rating: 0,
    status: 'Published'
  },
  {
    id: 2,
    product: '泰式打抛豬',
    review: '很好吃',
    date: 'Mar 17, 2021',
    rating: 4,
    status: 'Published'
  },
  {
    id: 3,
    product: '紐奧良香煎雞',
    review: '尚未評論',
    date: 'Apr 21, 2020',
    rating: 0,
    status: 'Published'
  },
  {
    id: 4,
    product: '黃金蒜香雞',
    review: '會再回購',
    date: 'Apr 21, 2020',
    rating: 5,
    status: 'Published'
  }
];

const RolesApp: React.FC = () => {
  return <ReviewCards reviewsData={rolesData} />;
};

export default RolesApp;