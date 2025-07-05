import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  TextInput,
  StyleSheet,
} from 'react-native';
import { Product } from '@/data/product';
import { styles } from './HomeStyle';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import { productStorage, productCategories } from '@/data/product';
import { userStorage, User } from '@/data/users';
import { headerStyles } from './HomeStyle';
import { myTheme } from '@/constants/theme';


type RootStackParamList = {
  Home: { isUserLoggedIn: boolean };
  ProductDetailPage: { id: number };
  UserProfile: { userId: string };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export const HomePage = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'Home'>>();
  const isUserLoggedIn = route.params?.isUserLoggedIn ?? false;

  const screenWidth = Dimensions.get('window').width;
  const itemWidth = (screenWidth - 36) / 2;

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userMap, setUserMap] = useState<Record<string, User>>({});
  const [sortBy, setSortBy] = useState<'createdAt' | 'price'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchQuery, setSearchQuery] = useState('');

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

      if (isUserLoggedIn) {
        const filtered = allProducts
          .filter((p) => p.isActive)
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );

        setProducts(filtered);
        applyFilters(filtered);
      } else {
        setProducts(allProducts);
        applyFilters(allProducts);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = (productsToFilter: Product[]) => {
    let filtered = [...productsToFilter];
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(
        (product) => product.productCategory === selectedCategory
      );
    }
    
    // Apply search filter
    if (searchQuery) {
      const keyword = searchQuery.toLowerCase();
      filtered = filtered.filter((p) =>
        [p.name, p.category, p.productCategory, p.description]
          .join(' ')
          .toLowerCase()
          .includes(keyword)
      );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === 'createdAt') {
        return sortOrder === 'desc'
          ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else {
        return sortOrder === 'desc'
          ? (b.salePrice || b.price) - (a.salePrice || a.price)
          : (a.salePrice || a.price) - (b.salePrice || b.price);
      }
    });
    
    setFilteredProducts(filtered);
  };

  const filterByCategory = (category: string) => {
    setSelectedCategory(category);
    applyFilters(products);
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    applyFilters(products);
  };

  const changeSortBy = (type: 'createdAt' | 'price') => {
    setSortBy(type);
    applyFilters(products);
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    applyFilters(products);
  };

  const handleUserPress = (userId: string) => {
    navigation.navigate('Logout', { userId });
  };

  useEffect(() => {
    fetchUsers();
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters(products);
  }, [sortBy, sortOrder, searchQuery, selectedCategory]);

  // ... keep your existing renderProductItem function ...
  const renderProductItem = ({ item }: { item: Product }) => {
  const owner = item.userId ? userMap[item.userId] : null;
  
  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetailPage', { id: product.id });
  };
  return (
    <View style={[styles.productContainer, { width: itemWidth }]}>
      {/* Product Image with Sold Badge */}
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => handleProductPress(item)}>
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
        </TouchableOpacity>
      </View>

      {/* Product Info */}
      <View style={styles.productInfoContainer}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>

        {/* Price Display */}
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

      {/* Action Buttons */}
      <View style={styles.productActions}>
        {/* Details Button */}
        <TouchableOpacity
          onPress={() => handleProductPress(item)}
          style={styles.detailsButton}
        >
          <Text style={styles.detailsButtonText}>Details</Text>
          <MaterialIcons name="chevron-right" size={18} color={myTheme.colors.white} />
        </TouchableOpacity>

        {/* User Profile Button */}
        {owner && (
          <TouchableOpacity
            onPress={() => handleUserPress(owner.id)}
            style={styles.userButton}
          >
            <Image
              source={{
                uri: owner.imageUri || 'https://i.pravatar.cc/150?img=3',
              }}
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
      {/* Top Bar with Filters and Search */}
      <View style={headerStyles.topBar}>
        {/* Left Side - Filter Controls */}
        <View style={headerStyles.filterContainer}>
          <TouchableOpacity 
            style={[
              headerStyles.filterButton,
              sortBy === 'createdAt' && headerStyles.activeFilter
            ]}
            onPress={() => changeSortBy('createdAt')}
          >
            <MaterialIcons 
              name="date-range" 
              size={20} 
              color={sortBy === 'createdAt' ? '#007AFF' : myTheme.colors.grey0} 
            />
            <Text style={[
              headerStyles.filterText,
              sortBy === 'createdAt' && headerStyles.activeFilterText
            ]}>
              Date
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              headerStyles.filterButton,
              sortBy === 'price' && headerStyles.activeFilter
            ]}
            onPress={() => changeSortBy('price')}
          >
            <FontAwesome 
              name="dollar" 
              size={20} 
              color={sortBy === 'price' ? myTheme.colors.warning : '#666'} 
            />
            <Text style={[
              headerStyles.filterText,
              sortBy === 'price' && headerStyles.activeFilterText
            ]}>
              Price
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={headerStyles.sortOrderButton}
            onPress={toggleSortOrder}
          >
            <MaterialIcons 
              name={sortOrder === 'asc' ? 'arrow-upward' : 'arrow-downward'} 
              size={20} 
              color="#007AFF" 
            />
          </TouchableOpacity>
        </View>
        
        {/* Right Side - Search Input */}
        <View style={headerStyles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={headerStyles.searchIcon} />
          <TextInput
            placeholder="Search products..."
            style={headerStyles.searchInput}
            value={searchQuery}
            onChangeText={handleSearch}
            placeholderTextColor="#999"
          />
        </View>
      </View>

      {/* Category Scroll View */}
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
                selectedCategory === category &&
                  styles.categoryButtonTextActive,
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
          <Text style={styles.emptyText}>No products found</Text>
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