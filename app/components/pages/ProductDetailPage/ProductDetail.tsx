import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { productStorage, Product } from '@/data/product';
import { userStorage, User } from '@/data/users';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { styles } from './ProductDetailStyle';
import { router } from 'expo-router';

type RootStackParamList = {
  ProductDetailPage: { id: number };
  Home: undefined;
  ModifyProduct: { product: Product };
};

type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetailPage'>;
type ProductDetailNavProp = StackNavigationProp<RootStackParamList, 'ProductDetailPage'>;

export const ProductDetailPage = () => {
  const route = useRoute<ProductDetailRouteProp>();
  const navigation = useNavigation<ProductDetailNavProp>();
  const { id } = route.params;

  const [product, setProduct] = useState<Product | null>(null);
  const [owner, setOwner] = useState<User | null>(null);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const allProducts = await productStorage.getAllProducts();
        const foundProduct = allProducts.find((p) => p.id === id);
        setProduct(foundProduct || null);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoadingProduct(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchOwner = async () => {
      if (!product?.userId) {
        setLoadingUser(false);
        return;
      }

      try {
        const users = await userStorage.getAllUsers();
        const foundOwner = users.find((u) => u.id === product.userId);
        setOwner(foundOwner || null);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoadingUser(false);
      }
    };

    if (product) {
      fetchOwner();
    }
  }, [product]);

  const handleDelete = async () => {
    try {
      await productStorage.deleteProduct(id);
      navigation.navigate('Home')
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleModify = () => {
    if (product) {
      console.log('Ovaina : ' , product)
      navigation.navigate('Modify', { product });
    }
  };

  if (loadingProduct) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Product Image */}
      <Image source={{ uri: product.image }} style={styles.productImage} />
      
      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.modifyButton} onPress={handleModify}>
          <MaterialIcons name="edit" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <MaterialIcons name="delete" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
      {/* Product Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productCategory}>{product.productCategory || product.category}</Text>
        
        {/* Price */}
        <View style={styles.priceContainer}>
          {product.salePrice ? (
            <>
              <Text style={styles.salePrice}>{product.currency}{product.salePrice.toFixed(2)}</Text>
              <Text style={styles.originalPrice}>{product.currency}{product.price.toFixed(2)}</Text>
            </>
          ) : (
            <Text style={styles.price}>{product.currency}{product.price.toFixed(2)}</Text>
          )}
        </View>
        
        {/* Description */}
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{product.description}</Text>
        
        {/* Stock */}
        <Text style={styles.sectionTitle}>Availability</Text>
        <Text style={styles.stock}>
          {product.stock > 0 
            ? `In stock: ${product.stock} units` 
            : 'Out of stock'}
        </Text>
        
        {/* Owner */}
        {loadingUser ? (
          <ActivityIndicator size="small" color="#007AFF" />
        ) : owner ? (
          <>
            <Text style={styles.sectionTitle}>Seller Information</Text>
            <View style={styles.ownerContainer}>
              <Image 
                source={{ uri: owner.imageUri || 'https://i.pravatar.cc/150?img=3' }} 
                style={styles.ownerImage}
              />
              <View style={styles.ownerInfo}>
                <Text style={styles.ownerName}>{owner.name}</Text>
                <Text style={styles.ownerEmail}>{owner.email}</Text>
              </View>
            </View>
          </>
        ) : (
          <Text style={styles.sectionTitle}>Seller not found</Text>
        )}
      </View>
    </ScrollView>
  );
};
