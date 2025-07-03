export interface Product {
  name: string;
  category: string;
  stock: number;
  description: string;
  price: number;
  currency: string;
  image: any;
  isActive: boolean;
  salePrice?: number;
  discount?: string;
}

export const products: Product[] = [
  {
    name: "Evening Dress",
    category: "Dorothy Perkins",
    stock: 25,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    salePrice: 12,
    price: 15,
    currency: "$",
    image: require('@/assets/images/product1.png'),
    isActive: true,
  },
  {
    name: "Sport Dress",
    category: "Sitily",
    stock: 15,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt",
    salePrice: 22,
    price: 19,
    currency: "$",
    image: require('@/assets/images/product2.png'),
    discount: '-20%',
    isActive: true,
  },
  {
    name: "Sport Dress",
    category: "Dorothy Perkins",
    stock: 10,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt",
    price: 14,
    currency: "$",
    image: require('@/assets/images/product3.png'),
    isActive: true,
  },
  {
    name: "Light Blouse",
    category: "Dorothy Perkins",
    stock: 5,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt",
    price: 12,
    currency: "$",
    image: require('@/assets/images/product4.png'),
    discount: '-20%',
    isActive: true,
  }
];