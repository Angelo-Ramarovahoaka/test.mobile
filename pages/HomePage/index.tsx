import React from 'react';
import { View, FlatList } from 'react-native';
import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { styles } from './styles';

export const HomePage = () => {
  return (
    <View style={styles.container}>
      <Header title="Home" showUser={true} />
      
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.listContent}
        numColumns={2}
      />
    </View>
  );
};