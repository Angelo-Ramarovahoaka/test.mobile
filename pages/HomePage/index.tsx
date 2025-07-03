import React from 'react';
import { View, FlatList } from 'react-native';
import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

export const HomePage = () => {
  const navigation = useNavigation();

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetail', { product });
  };

  return (
    <View style={styles.container}>
      <Header title="Home" showUser={true} />
      
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard 
            product={item} 
            onPress={() => handleProductPress(item)} 
          />
        )}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.listContent}
        numColumns={2}
      />
    </View>
  );
};