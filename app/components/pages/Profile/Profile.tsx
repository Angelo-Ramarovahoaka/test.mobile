import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert
} from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { userStorage } from '@/data/users';
import { productStorage } from '@/data/product';
import { styles } from './ProfileStyle';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  imageUri?: string;
  createdAt?: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  isActive: boolean;
  userId?: string;
}

const ProfilePage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  const { userId } = route.params as { userId: string };

  const fetchData = async () => {
    try {
      const userData = await userStorage.getUserById(userId);
      
      if (!userData) {
        Alert.alert('Error', 'User not found');
        navigation.goBack();
        return;
      }

      setUser(userData);
      
      const allProducts = await productStorage.getAllProducts();
      const userProducts = allProducts.filter(p => p.userId === userId);
      setProducts(userProducts);
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Failed to load profile data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchData();
    } else {
      Alert.alert('Error', 'No user ID provided');
      navigation.goBack();
    }
  }, [userId, navigation]);

  const handleProductPress = (productId: number) => {
    navigation.navigate('ProductDetailPage', { id: productId });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => handleProductPress(item.id)}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
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
        {!item.isActive && (
          <View style={styles.soldBadge}>
            <Text style={styles.soldText}>SOLD</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: user?.imageUri || 'https://i.pravatar.cc/150?img=3' }}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
          {user?.phone && (
            <View style={styles.contactInfo}>
              <Ionicons name="call" size={16} color="#666" />
              <Text style={styles.contactText}>{user.phone}</Text>
            </View>
          )}
          {user?.createdAt && (
            <Text style={styles.memberSince}>
              Member since: {new Date(user.createdAt).toLocaleDateString()}
            </Text>
          )}
        </View>
      </View>

      {/* User Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{products.length}</Text>
          <Text style={styles.statLabel}>Products</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {products.filter(p => p.isActive).length}
          </Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {products.filter(p => !p.isActive).length}
          </Text>
          <Text style={styles.statLabel}>Sold</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>My Products</Text>
    </>
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <FontAwesome name="dropbox" size={40} color="#ddd" />
      <Text style={styles.emptyText}>No products listed yet</Text>
      <TouchableOpacity 
        style={styles.addProductButton}
        onPress={() => navigation.navigate('AddProduct')}
      >
        <Text style={styles.addProductButtonText}>Add Your First Product</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>User not found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      renderItem={renderProductItem}
      keyExtractor={item => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.container}
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={renderEmptyComponent}
      refreshing={refreshing}
      onRefresh={handleRefresh}
      showsVerticalScrollIndicator={false}
    />
  );
};
export default ProfilePage;