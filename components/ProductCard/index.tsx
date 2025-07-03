import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Product } from '@/data/product';
import { styles } from './styles';

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri : product.image}} style={styles.image} />
        {product.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{product.discount}</Text>
          </View>
        )}
      </View>
      
      <Text style={styles.category}>{product.category}</Text>
      <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
      
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
    </TouchableOpacity>
  );
};