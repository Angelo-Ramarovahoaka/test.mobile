import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Product } from '@/data/product';
import { styles } from './HomeStyle';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { productStorage, productCategories } from '@/data/product';

type RootStackParamList = {
  Home: undefined;
  ProductDetailPage: { id: number };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export const HomePage = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = (screenWidth - 36) / 2; // 36 = padding horizontal (16*2) + gap (4)

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const fetchFilteredProducts = async (category: string) => {
    try {
      setSelectedCategory(category);
      if (category === 'All') {
        const all = await productStorage.getAllProducts();
        setProducts(all);
      } else {
        const filtered = await productStorage.filterProducts({ productCategory: category });
        setProducts(filtered);
      }
    } catch (error) {
      console.error('Error filtering products:', error);
    }
  };

  useEffect(() => {
    fetchFilteredProducts('All'); // Load all products on mount
  }, []);

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetailPage', { id: product.id });
  };

  return (
    <View style={styles.container}>
      {/* 🔍 Filter bar */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10 }}>
        {productCategories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => fetchFilteredProducts(category)}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive,
            ]}
          >
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === category && styles.categoryButtonTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 🛍️ Product Grid */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => (
          <View style={[styles.productContainer, { width: itemWidth }]}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
            <View style={styles.productActions}>
              <TouchableOpacity
                onPress={() => handleProductPress(item)}
                style={styles.actionButton}
              >
                <MaterialIcons name="visibility" size={20} color="#007AFF" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};
