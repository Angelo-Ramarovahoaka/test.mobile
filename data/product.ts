import * as FileSystem from 'expo-file-system';
// Define the Product interface
export interface Product {
  id : number;
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
  imageUrl?: string; // Optional for displaying in the UI
}

export const products: Product[] =[
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
    "isActive": true
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
    "isActive": true
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
    "isActive": true
  }
]
const PRODUCTS_FILE_PATH = FileSystem.documentDirectory + 'products.json';
console.log('PRODUCTS_FILE_PATH:', PRODUCTS_FILE_PATH);

// Initialize the products file with default data if it doesn't exist
const initializeProductsFile = async () => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(PRODUCTS_FILE_PATH);
    if (!fileInfo.exists) {
      await FileSystem.writeAsStringAsync(
        PRODUCTS_FILE_PATH,
        JSON.stringify(products, null, 2)
      );
      console.log('Fichier products.json créé avec les données initiales');
    }
  } catch (error) {
    console.error('Erreur lors de l\'initialisation du fichier:', error);
  }
};  
export const productStorage = {
  // Get all products including the default products
  getAllProducts: async (): Promise<Product[]> => {
    try {
      await initializeProductsFile();
      const fileContent = await FileSystem.readAsStringAsync(PRODUCTS_FILE_PATH);
      const products = JSON.parse(fileContent) as Product[];
      // Check if the file contains valid data
      if (!products || products.length === 0) {
        // If the file is empty, reset it with default data
        await FileSystem.writeAsStringAsync(
          PRODUCTS_FILE_PATH,
          JSON.stringify(products, null, 2)
        );
        return products;
      }
      return products;
    } catch (error) {
      console.error('Erreur lors de la lecture des produits:', error);
      // Return default products in case of error
      return [...products];
    }
  },
  // Add a new product
  addProduct: async (product: Omit<Product, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
    try {
      const products = await productStorage.getAllProducts();
      const newProduct: Product = {
        ...product,
        id: Date.now(), // Generate a unique ID based on current timestamp
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      products.push(newProduct);
      await FileSystem.writeAsStringAsync(
        PRODUCTS_FILE_PATH,
        JSON.stringify(products, null, 2)
      );
      return newProduct;
    } catch (error) {
      console.error('Erreur lors de l\'ajout du produit:', error);
      throw error;
    }
  },
  // Delete a product by ID
  deleteProduct: async (id: number): Promise<void> => {
    try {
      const products = await productStorage.getAllProducts();
      const updatedProducts = products.filter(product => product.id !== id);
      await FileSystem.writeAsStringAsync(
        PRODUCTS_FILE_PATH,
        JSON.stringify(updatedProducts, null, 2)
      );
      console.log(`Produit avec l'ID ${id} supprimé`);
    } catch (error) {
      console.error('Erreur lors de la suppression du produit:', error);
      throw error;
    }
  },
  // Update a product by ID
  updateProduct: async (id: number, updatedProduct: Partial<Product>): Promise<Product |
  undefined> => {
    try {
      const products = await productStorage.getAllProducts();
      const productIndex = products.findIndex(product => product.id === id);
      
      if (productIndex === -1) {
        console.error(`Produit avec l'ID ${id} non trouvé`);
        return undefined;
      }
      
      const currentProduct = products[productIndex];
      const newProduct: Product = {
        ...currentProduct,
        ...updatedProduct,
        updatedAt: new Date().toISOString(),
      };
      
      products[productIndex] = newProduct;
      await FileSystem.writeAsStringAsync(
        PRODUCTS_FILE_PATH,
        JSON.stringify(products, null, 2)
      );
      
      return newProduct;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du produit:', error);
      throw error;
    }
  },
  // search products by name,category or productCategory,description
  searchProducts: async (query: string): Promise<Product[]> => {
    try {
      const products = await productStorage.getAllProducts();
      const lowerCaseQuery = query.toLowerCase();
      
      return products.filter(product => 
        product.name.toLowerCase().includes(lowerCaseQuery) ||
        product.category.toLowerCase().includes(lowerCaseQuery) ||
        product.productCategory.toLowerCase().includes(lowerCaseQuery) ||
        product.description.toLowerCase().includes(lowerCaseQuery)
      );
    } catch (error) {
      console.error('Erreur lors de la recherche des produits:', error);
      return [];
    }
  },
  // Filter products by category, active status, price range, and creation/update dates
  filterProducts: async (filters: {
    productCategory?: string;
    isActive?: boolean;
    minPrice?: number;
    maxPrice?: number;
    createdAt?: string;   // e.g., "2024-01-01"
    updatedAt?: string;   // e.g., "2024-07-01"
  }): Promise<Product[]> => {
    try {
      const products = await productStorage.getAllProducts();

      return products.filter(product => {
        const {
          productCategory,
          isActive,
          minPrice,
          maxPrice,
          createdAt,
          updatedAt,
        } = filters;

        const matchesCategory = productCategory
          ? product.productCategory === productCategory
          : true;

        const matchesActive = isActive !== undefined
          ? product.isActive === isActive
          : true;

        const matchesMinPrice = minPrice !== undefined
          ? product.price >= minPrice
          : true;

        const matchesMaxPrice = maxPrice !== undefined
          ? product.price <= maxPrice
          : true;

        const matchesCreatedAt = createdAt
          ? new Date(product.createdAt ?? '') >= new Date(createdAt)
          : true;

        const matchesUpdatedAt = updatedAt
          ? new Date(product.updatedAt ?? '') >= new Date(updatedAt)
          : true;

        return (
          matchesCategory &&
          matchesActive &&
          matchesMinPrice &&
          matchesMaxPrice &&
          matchesCreatedAt &&
          matchesUpdatedAt
        );
      });

    } catch (error) {
      console.error('Erreur lors du filtrage des produits:', error);
      return [];
    }
  },
  // Get a product by ID
  getProductById: async (id: number): Promise<Product | undefined> => {
    try {
      const products = await productStorage.getAllProducts();
      return products.find(product => product.id === id);
    } catch (error) {
      console.error('Erreur lors de la récupération du produit:', error);
      return undefined;
    }
  }
};


export const productCategories =  ["All","T-shirts", "Crop tops", "Blouses", "sport", "Light dress"];