import React from 'react';
import { View, FlatList, Text, Button } from 'react-native';
import { Product, products } from '@/data/product';
import { styles } from './styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  ProductDetail: { product: Product };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export const HomePage = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetail', { product });
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to the Home Page!</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 8 }}>
            <Text>Product Name: {item.name}</Text>
            <Text>Product Price: ${item.price}</Text>
            <Button title="View Details" onPress={() => handleProductPress(item)} />
          </View>
        )}
      />
    </View>
  );
};