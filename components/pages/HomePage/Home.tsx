import React, { useState } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Product, products } from '@/data/product';
import { styles } from './HomeStyle';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { productStorage } from '@/data/product';
type RootStackParamList = {
  Home: undefined;
  ProductDetail: { id: number };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export const HomePage = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = (screenWidth - 36) / 2; // 36 = padding horizontal (16*2) + gap (4)

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetailPage', { id: product.id });
  };

  const handleDelete = (product: Product) => {
    console.log('Delete product:', product);
    // Ajoutez votre logique de suppression ici
  };
  // get all products from productStorage
  const [products, setProducts] = useState<Product[]>([]);
  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await productStorage.getAllProducts();
        setProducts(allProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);
  console.log('Products in HomePage:', products);
  return (
    <View style={styles.container}>
      
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => (
          <View style={[styles.productContainer, { width: itemWidth }]}>
            <Image source={{uri : item.image}} style={styles.productImage} />
            <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
            <View style={styles.productActions}>
              <TouchableOpacity 
                onPress={() => handleProductPress(item)}
                style={styles.actionButton}
              >
                <MaterialIcons name="visibility" size={20} color="#007AFF" />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => handleDelete(item)}
                style={styles.actionButton}
              >
                <MaterialIcons name="delete" size={20} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};