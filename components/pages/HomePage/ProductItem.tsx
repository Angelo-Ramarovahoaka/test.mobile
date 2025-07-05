import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Product } from '@/data/product';
import { User } from '@/data/users';
import { styles } from './HomeStyle';

interface ProductItemProps {
  item: Product;
  userMap: Record<string, User>;
  handleProductPress: (product: Product) => void;
  handleUserPress: (userId: string) => void;
  itemWidth: number;
}

export const ProductItem = ({
  item,
  userMap,
  handleProductPress,
  handleUserPress,
  itemWidth,
}: ProductItemProps) => {
  const owner = item.userId ? userMap[item.userId] : null;

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
          <MaterialIcons name="chevron-right" size={18} color="#ffffff" />
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