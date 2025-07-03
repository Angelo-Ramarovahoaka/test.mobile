export interface Product {
  id : number;
  name: string;
  category: string;
  stock: number;
  description: string;
  price: number;
  currency: string;
  image: string;
  isActive: boolean;
  salePrice?: number;
  discount?: string;
}

export const products: Product[] = [
  {
    id : 1,
    name: "Evening Dress",
    category: "Dorothy Perkins",
    stock: 25,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    salePrice: 12,
    price: 15,
    currency: "$",
    image: require('../assets/images/products/product1.png'),
    isActive: true,
  },
  {
    id : 2,
    name: "Sport Dress",
    category: "Sitily",
    stock: 15,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt",
    salePrice: 22,
    price: 19,
    currency: "$",
    image: require('@/assets/images/products/product2.png'),
    discount: '-20%',
    isActive: true,
  },
  {
    id : 3,
    name: "Sport Dress",
    category: "Dorothy Perkins",
    stock: 10,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt",
    price: 14,
    currency: "$",
    image: require('@/assets/images/products/product3.png'),
    isActive: true,
  },
];