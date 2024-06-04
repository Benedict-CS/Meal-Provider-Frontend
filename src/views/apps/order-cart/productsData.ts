export interface Product {
    id: string;
    quantity: string;
    name: string;
    price: number;
    description: string;
    vendor: string;
    inStock: boolean;
    category: string;
    image: string;
    status: 'Sold Out' | '';
  }

export const initialProducts: Product[] = [
    {
     id: '1',
     name: '蜜汁紅燒五花',
     price: 110,
     description: 'Hoeger-Powlowski',
     vendor: 'Accessories',
     inStock: false,
     category: '豬',
     image: '/images/food/1.png',
     status: '',
     quantity:'8'

   }, {
     id: '2',
     name: '泰式打抛豬',
     price: 100,
     description: 'Hoeger-Powlowski',
     vendor: 'Accessories',
     inStock: false,
     category: '豬',
     image: '/images/food/2.png',
     status: '',
     quantity:'4'

   }, {
     id: '3',
     name: '黑胡椒牛排',
     price: 130,
     description: 'Hoeger-Powlowski',
     vendor: 'Accessories',
     inStock: false,
     category: '牛',
     image: '/images/food/3.png',
     status: 'Sold Out',
     quantity:'0'
   }, {
     id: '4',
     name: '紐奧良香煎雞',
     price: 110,
     description: 'Hoeger-Powlowski',
     vendor: 'Accessories',
     inStock: false,
     category: '雞',
     image: '/images/food/4.png',
     status: '',
     quantity:'28'

   },
   {
     id: '5',
     name: '黃金蒜香雞',
     price: 110,
     description: 'Hoeger-Powlowski',
     vendor: 'Accessories',
     inStock: false,
     category: '雞',
     image: '/images/food/5.png',
     status: '',
     quantity:'0'
   }
   // More products...
  ];

