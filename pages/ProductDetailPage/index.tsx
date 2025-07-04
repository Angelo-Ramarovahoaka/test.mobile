import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { products } from '@/data/product';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { styles } from './styles';

type RootStackParamList = {
  ProductDetailPage: { id: number };
  Home: undefined;
};

type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetailPage'>;

export const ProductDetailPage = () => {
  const route = useRoute<ProductDetailRouteProp>();
  const { id } = route.params;
  
  // Trouver le produit correspondant à l'ID
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Produit non trouvé</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri :product.image}} style={styles.productImage} />
      
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productCategory}>{product.category}</Text>
        
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
        <Text style={styles.stock}>En stock: {product.stock}</Text>
        
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.buttonText}>Modifier</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
