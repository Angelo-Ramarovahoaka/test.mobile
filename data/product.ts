export interface Product {
  id : number;
  name: string;
  category: string;
  productCategory: string;
  stock: number;
  description: string;
  ratingValue: number;
  totalRating: number;
  price: number;
  currency: string;
  image: string;
  isActive: boolean;
  salePrice?: number;
  discount?: string;
}

export const products: Product[] =[
  {
    "id": 1,
    "name": "Cotton Hi‑Neck T‑Shirt Black",
    "category": "Son of a Tailor",
    "productCategory": "T‑shirts",
    "stock": 30,
    "description": "Accent neckline, heavy‑weight Supima cotton, made to order in Portugal.",
    "ratingValue": 4,
    "totalRating": 120,
    "salePrice": 58,
    "price": 65,
    "currency": "US$",
    "image": "https://img.sonofatailor.com/images/customizer/product/highneck/Black_Regular.jpg", 
    "isActive": true
  },
  {
    "id": 2,
    "name": "Cotton Hi‑Neck T‑Shirt White",
    "category": "Son of a Tailor",
    "productCategory": "T‑shirts",
    "stock": 25,
    "description": "Classic cut, 100% Supima cotton mid‑weight, side‑slits.",
    "ratingValue": 5,
    "totalRating": 200,
    "salePrice": 60,
    "price": 65,
    "currency": "US$",
    "image": "https://m.media-amazon.com/images/I/71MWgi5X10L._UY1000_.jpg", 
    "isActive": true
  },
  {
    "id": 3,
    "name": "Gildan Heavy Cotton T‑Shirt White",
    "category": "Gildan",
    "productCategory": "T‑shirts",
    "stock": 100,
    "description": "Classic heavyweight crew neck, durable everyday staple.",
    "ratingValue": 4,
    "totalRating": 350,
    "salePrice": 6,
    "price": 8,
    "currency": "$",
    "image": "https://avivawholesale.com/cdn/shop/products/flgfapp1000019288_-01_gildan-heavy-cotton-adult-t-shirt-white.jpg?v=1566346635&width=1200", 
    "isActive": true
  },
  {
    "id": 4,
    "name": "Pro Club Heavyweight Crew Tee",
    "category": "Pro Club",
    "productCategory": "T‑shirts",
    "stock": 80,
    "description": "6.5 oz heavy cotton, relaxed fit crew neck.",
    "ratingValue": 4.2,
    "totalRating": 90,
    "salePrice": 7,
    "price": 10,
    "currency": "$",
    "image": "https://www.hanes.com/images/catalog/catalog/product/H/N/HNS_R5280/HNS_R5280_Black_Front.jpg?width=449", 
    "isActive": true
  },
  {
    "id": 5,
    "name": "Hanes Essentials Cotton Tee Black",
    "category": "Hanes",
    "productCategory": "T‑shirts",
    "stock": 60,
    "description": "100% cotton essentials tee, tag‑free neck.",
    "ratingValue": 4.3,
    "totalRating": 210,
    "salePrice": 5,
    "price": 7,
    "currency": "$",
    "image": "https://m.media-amazon.com/images/I/71MWgi5X10L._UY1000_.jpg", 
    "isActive": true
  },
  {
    "id": 6,
    "name": "Fuego Cropped Graphic Tee",
    "category": "Fuego Dance",
    "productCategory": "Crop tops",
    "stock": 45,
    "description": "Dropped shoulders, bold gradient logo, preshrunk.",
    "ratingValue": 4.5,
    "totalRating": 65,
    "salePrice": 22,
    "price": 25,
    "currency": "$",
    "image": "https://images-cdn.ubuy.co.in/6688b8babce9fc5f6e259ecf-crop-tops-sweatshirts-for-women-cute.jpg", 
    "isActive": true
  },
  {
    "id": 7,
    "name": "Ododos Rib‑Knit Crop Tank (3‑Pack)",
    "category": "Ododos",
    "productCategory": "Crop tops",
    "stock": 120,
    "description": "Supportive rib‑knit for workout & lounge, 4‑way stretch.",
    "ratingValue": 5,
    "totalRating": 7500,
    "salePrice": 29,
    "price": 58,
    "currency": "$",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9vw8tLiqAFbWdNe7h7d9hF-Io1hNjLs7FuB8q0CCmVzmVSIOI7yU31QHEFCOJyqBOLCg&usqp=CAU", 
    "isActive": true
  },
  {
    "id": 8,
    "name": "Primark Transitional Crop Tee",
    "category": "Primark",
    "productCategory": "Crop tops",
    "stock": 200,
    "description": "£4.50 staple crop tee, graphic styles.",
    "ratingValue": 4,
    "totalRating": 300,
    "salePrice": 5,
    "price": 5,
    "currency": "£",
    "image": "https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/27684952/2024/2/19/55070187-49ca-4599-bc0c-37c4181bf2d11708340641873BerryBirdCropTop1.jpg", 
    "isActive": true
  },
  {
    "id": 9,
    "name": "HELLO MOLLY Trendy Crop Top",
    "category": "Hello Molly",
    "productCategory": "Crop tops",
    "stock": 70,
    "description": "Fashion‑forward crop tops, latest seasonal styles.",
    "ratingValue": 4.2,
    "totalRating": 150,
    "salePrice": 35,
    "price": 40,
    "currency": "$",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9vw8tLiqAFbWdNe7h7d9hF-Io1hNjLs7FuB8q0CCmVzmVSIOI7yU31QHEFCOJyqBOLCg&usqp=CAU", 
    "isActive": true
  },
  {
    "id": 10,
    "name": "Redbubble Classic T‑Shirt",
    "category": "Redbubble",
    "productCategory": "Blouses",
    "stock": 50,
    "description": "Slim‑fit graphic tee, 100% combed cotton.",
    "ratingValue": 4,
    "totalRating": 80,
    "salePrice": 25,
    "price": 28,
    "currency": "$",
    "image": "https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/3_4Ratio/SearchINT/Lge/AJ0879.jpg?im=Resize,width=450", 
    "isActive": true
  }
]


export const productCategories =  ["All","T-shirts", "Crop tops", "Blouses", "sport", "Light dress"];