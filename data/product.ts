import * as FileSystem from 'expo-file-system';

// Define the Product interface
export interface Product {
  id: number;
  userId?: string;
  name: string;
  category: string;
  productCategory: string;
  stock: number;
  description: string;
  price: number;
  currency: string;
  image: string;
  isActive: boolean;
  salePrice?: number;
  discount?: string;
  createdAt?: string;
  updatedAt?: string;
  imageUrl?: string;
}

// Sample product data
export const products: Product[] = [
  {
    "id": 1,
    "userId": "1751692461329",
    "name": "Cotton Hi‑Neck T‑Shirt Black",
    "category": "Son of a Tailor",
    "productCategory": "T‑shirts",
    "stock": 30,
    "description": "Accent neckline, heavy‑weight Supima cotton, made to order in Portugal.",
    "salePrice": 58,
    "price": 65,
    "currency": "US$",
    "image": "https://img.sonofatailor.com/images/customizer/product/highneck/Black_Regular.jpg", 
    "isActive": true,
    "createdAt": new Date().toISOString(),
    "updatedAt": new Date().toISOString()
  },
  {
    "id": 9,
    "userId": "1751692461329",
    "name": "HELLO MOLLY Trendy Crop Top",
    "category": "Hello Molly",
    "productCategory": "Crop tops",
    "stock": 70,
    "description": "Fashion‑forward crop tops, latest seasonal styles.",
    "salePrice": 35,
    "price": 40,
    "currency": "$",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9vw8tLiqAFbWdNe7h7d9hF-Io1hNjLs7FuB8q0CCmVzmVSIOI7yU31QHEFCOJyqBOLCg&usqp=CAU", 
    "isActive": true,
    "createdAt": new Date().toISOString(),
    "updatedAt": new Date().toISOString()
  },
  {
    "id": 10,
    "userId": "1751692461329",
    "name": "Redbubble Classic T‑Shirt",
    "category": "Redbubble",
    "productCategory": "Blouses",
    "stock": 50,
    "description": "Slim‑fit graphic tee, 100% combed cotton.",
    "salePrice": 25,
    "price": 28,
    "currency": "$",
    "image": "https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/3_4Ratio/SearchINT/Lge/AJ0879.jpg?im=Resize,width=450", 
    "isActive": true,
    "createdAt": new Date().toISOString(),
    "updatedAt": new Date().toISOString()
  }
];

const PRODUCTS_FILE_PATH = FileSystem.documentDirectory + 'products.json';

// Initialize the products file
const initializeProductsFile = async () => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(PRODUCTS_FILE_PATH);
    if (!fileInfo.exists) {
      await FileSystem.writeAsStringAsync(
        PRODUCTS_FILE_PATH,
        JSON.stringify(products, null, 2)
      );
      console.log('Products file created with initial data');
    }
  } catch (error) {
    console.error('Error initializing products file:', error);
    throw error;
  }
};

export const productStorage = {
  // Get all products
  getAllProducts: async (): Promise<Product[]> => {
    try {
      await initializeProductsFile();
      const fileContent = await FileSystem.readAsStringAsync(PRODUCTS_FILE_PATH);
      const storedProducts = JSON.parse(fileContent) as Product[];
      
      // Validate loaded products
      if (!Array.isArray(storedProducts)) {
        console.warn('Invalid products data, resetting to default');
        await FileSystem.writeAsStringAsync(
          PRODUCTS_FILE_PATH,
          JSON.stringify(products, null, 2)
        );
        return products;
      }
      
      return storedProducts;
    } catch (error) {
      console.error('Error reading products:', error);
      return [...products]; // Return default products as fallback
    }
  },

  // Add a new product
  addProduct: async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
    try {
      const allProducts = await productStorage.getAllProducts();
      const newProduct: Product = {
        ...product,
        id: Date.now(), // Generate unique ID
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      allProducts.push(newProduct);
      await FileSystem.writeAsStringAsync(
        PRODUCTS_FILE_PATH,
        JSON.stringify(allProducts, null, 2)
      );
      return newProduct;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  },

  // Update a product
  updateProduct: async (updatedProduct: Product): Promise<Product> => {
    try {
      if (!updatedProduct?.id || typeof updatedProduct.id !== 'number') {
        throw new Error('Invalid product ID');
      }

      const allProducts = await productStorage.getAllProducts();
      const index = allProducts.findIndex(p => p.id === updatedProduct.id);
      
      if (index === -1) {
        throw new Error(`Product with ID ${updatedProduct.id} not found`);
      }

      const mergedProduct: Product = {
        ...allProducts[index],
        ...updatedProduct,
        updatedAt: new Date().toISOString()
      };

      allProducts[index] = mergedProduct;
      await FileSystem.writeAsStringAsync(
        PRODUCTS_FILE_PATH,
        JSON.stringify(allProducts, null, 2)
      );

      return mergedProduct;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // Delete a product
  deleteProduct: async (id: number): Promise<void> => {
    try {
      const allProducts = await productStorage.getAllProducts();
      const updatedProducts = allProducts.filter(p => p.id !== id);
      
      if (updatedProducts.length === allProducts.length) {
        throw new Error(`Product with ID ${id} not found`);
      }

      await FileSystem.writeAsStringAsync(
        PRODUCTS_FILE_PATH,
        JSON.stringify(updatedProducts, null, 2)
      );
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  // Get product by ID
  getProductById: async (id: number): Promise<Product | undefined> => {
    try {
      const allProducts = await productStorage.getAllProducts();
      return allProducts.find(p => p.id === id);
    } catch (error) {
      console.error('Error finding product:', error);
      return undefined;
    }
  },

  // Search products
  searchProducts: async (query: string): Promise<Product[]> => {
    try {
      const allProducts = await productStorage.getAllProducts();
      const lowerQuery = query.toLowerCase();
      
      return allProducts.filter(p => 
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.productCategory.toLowerCase().includes(lowerQuery)
      );
    } catch (error) {
      console.error('Error searching products:', error);
      return [];
    }
  },

  // Filter products
  filterProducts: async (filters: {
    productCategory?: string;
    isActive?: boolean;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<Product[]> => {
    try {
      const allProducts = await productStorage.getAllProducts();
      
      return allProducts.filter(p => {
        if (filters.productCategory && p.productCategory !== filters.productCategory) {
          return false;
        }
        if (filters.isActive !== undefined && p.isActive !== filters.isActive) {
          return false;
        }
        if (filters.minPrice !== undefined && p.price < filters.minPrice) {
          return false;
        }
        if (filters.maxPrice !== undefined && p.price > filters.maxPrice) {
          return false;
        }
        return true;
      });
    } catch (error) {
      console.error('Error filtering products:', error);
      return [];
    }
  }
};

// Product categories
export const productCategories = [
  "All",
  "T-shirts", 
  "Crop tops", 
  "Blouses", 
  "Sport", 
  "Light dress"
];