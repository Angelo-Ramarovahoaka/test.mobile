import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { Product } from '@/data/product';
import { styles } from './HomeStyle';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { productStorage, productCategories } from '@/data/product';
import { userStorage, User } from '@/data/users'; // Import userStorage and User type

type RootStackParamList = {
  Home: undefined;
  ProductDetailPage: { id: number };
  UserProfile: { userId: string };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export const HomePage = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = (screenWidth - 36) / 2;

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userMap, setUserMap] = useState<Record<string, User>>({}); // Map of userId to User

  // Fetch all users and create a map for quick lookup
  const fetchUsers = async () => {
    try {
      const users = await userStorage.getAllUsers();
      const userMap = users.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {} as Record<string, User>);
      setUserMap(userMap);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const allProducts = await productStorage.getAllProducts();
      setProducts(allProducts);
      setFilteredProducts(allProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterByCategory = async (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      try {
        setIsLoading(true);
        const filtered = await productStorage.filterProducts({ productCategory: category });
        setFilteredProducts(filtered);
      } catch (error) {
        console.error('Error filtering products:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetailPage', { id: product.id });
  };

  const handleUserPress = (userId: string) => {
    navigation.navigate('UserProfile', { userId });
  };

  useEffect(() => {
    fetchUsers();
    fetchProducts();
  }, []);

  const renderProductItem = ({ item }: { item: Product }) => {
    const owner = item.userId ? userMap[item.userId] : null;
    
    return (
      <View style={[styles.productContainer, { width: itemWidth }]}>
        {/* Product Image with Status Badge */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: item.image }} 
            style={styles.productImage} 
            resizeMode="cover"
          />
          {!item.isActive && (
            <View style={styles.inactiveBadge}>
              <Text style={styles.inactiveBadgeText}>SOLD</Text>
            </View>
          )}
        </View>

        {/* Product Info */}
        <View style={styles.productInfoContainer}>
          <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
          
          {/* Price Section */}
          <View style={styles.priceContainer}>
            {item.salePrice ? (
              <>
                <Text style={styles.salePrice}>${item.salePrice.toFixed(2)}</Text>
                <Text style={styles.originalPrice}>${item.price.toFixed(2)}</Text>
              </>
            ) : (
              <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
            )}
          </View>
        </View>

        {/* Product Actions */}
        <View style={styles.productActions}>
          <TouchableOpacity
            onPress={() => handleProductPress(item)}
            style={styles.detailsButton}
          >
            <Text style={styles.detailsButtonText}>Details</Text>
          </TouchableOpacity>
          
          {owner && (
            <TouchableOpacity 
              onPress={() => handleUserPress(owner.id)}
              style={styles.userButton}
            >
              <Image 
                source={{ uri: owner.imageUri || 'https://i.pravatar.cc/150?img=3' }} 
                style={styles.userImage}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Category Filter */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScrollContainer}
      >
        {productCategories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => filterByCategory(category)}
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

      {/* Product List */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : filteredProducts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No products found in this category</Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContentContainer}
          renderItem={renderProductItem}
        />
      )}
    </View>
  );
};