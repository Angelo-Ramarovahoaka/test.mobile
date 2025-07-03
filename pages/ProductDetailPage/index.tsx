// pages/ProductDetail/index.tsx
import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Header } from '@/components/Header';
import { styles } from './styles';
import { RouteProp } from '@react-navigation/native';
import { Ionicons as Icon } from '@expo/vector-icons';

// Define the Product type here or import it from your models/types file
type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  salePrice?: number;
  currency: string;
  description: string;
  stock: number;
  image: string; 
};

type ProductDetailRouteProp = RouteProp<{ ProductDetail: { product: Product } }, 'ProductDetail'>;

interface ProductDetailProps {
  route: ProductDetailRouteProp;
}
export const ProductDetailPage = ({ route }: ProductDetailProps) => {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <Header title="Product Details" showBackButton={true} />
      
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: product.image }} style={styles.image} />
        
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.category}>{product.category}</Text>
        
        <View style={styles.priceContainer}>
          {product.salePrice ? (
            <>
              <Text style={styles.salePrice}>{product.currency}{product.salePrice}</Text>
              <Text style={styles.originalPrice}>{product.currency}{product.price}</Text>
            </>
          ) : (
            <Text style={styles.price}>{product.currency}{product.price}</Text>
          )}
        </View>
        
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.stock}>In Stock: {product.stock}</Text>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addToCartButton}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.wishlistButton}>
            <Icon name="heart" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};