import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '@/components/pages/LoginPage/AuthContext';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from './CreateProductStyle'; // Adjust the import path as necessary
import { productStorage } from '@/data/product'; // Assuming you have a productStorage module to handle product data
// import { useNavigation } from '@react-navigation/native';
interface Product {
  id: number;
  userId?: number;
  name: string;
  category: string;
  productCategory: string;
  stock: number;
  description: string;
  price: number;
  currency: string;
  image: string;
  isActive: boolean;
  salePrice?: number;
  discount?: string;
  createdAt?: string;
  updatedAt?: string;
  imageUrl?: string; // Optional for displaying in the UI
}

const productCategories = ["T-shirts", "Crop tops", "Blouses", "sport", "Light dress"];
// const navigation = useNavigation()
const CreateProduct = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [image, setImage] = useState<string | null>(null);
  const [product, setProduct] = useState<Omit<Product, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>({
    name: '',
    category: '',
    productCategory: '',
    stock: 0,
    description: '',
    price: 0,
    currency: 'US$',
    image: '',
    isActive: true,
    salePrice: undefined,
    discount: '',
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      const uri = result.assets[0].uri;
      setImage(uri);
      setProduct({ ...product, image: uri });
    }
  };

  const handleChange = (field: keyof typeof product, value: any) => {
    setProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (!product.name || !product.category || !product.price || !product.image) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    const newProduct = {
      ...product,
      userId: user?.id 
    };
    // Save the product using your storage method
    productStorage.addProduct(newProduct)
      .then(() => {
        console.log('Product created successfully:', newProduct);
        router.replace('/(tabs)')

      })
      .catch((error) => {
        console.error('Error creating product:', error);
        Alert.alert('Error', 'Failed to create product. Please try again.');
      });
    
  };

  return (
    
    <View style={styles.container}>
      <Text style={styles.header}>Create New Product</Text>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
      {/* Upload Image */}
      <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <FontAwesome name="camera" size={24} color="#888" />
            <Text style={styles.uploadText}>Upload Product Image</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Name */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Product Name *</Text>
        <TextInput
          style={styles.input}
          value={product.name}
          onChangeText={(text) => handleChange('name', text)}
          placeholder="e.g. Cotton Hi-Neck T-Shirt"
        />
      </View>

      {/* Category */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Brand/Category *</Text>
        <TextInput
          style={styles.input}
          value={product.category}
          onChangeText={(text) => handleChange('category', text)}
          placeholder="e.g. Son of a Tailor"
        />
      </View>

      {/* Product Category */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Product Category *</Text>
        <View style={styles.selectContainer}>
          {productCategories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryButton,
                product.productCategory === cat && styles.selectedCategory,
              ]}
              onPress={() => handleChange('productCategory', cat)}
            >
              <Text
                style={[
                  styles.categoryText,
                  product.productCategory === cat && styles.selectedCategoryText,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Price + Sale Price */}
      <View style={styles.row}>
        <View style={[styles.formGroup, { flex: 1, marginRight: 10 }]}>
          <Text style={styles.label}>Price *</Text>
          <View style={styles.priceInputContainer}>
            <Text style={styles.currencySymbol}>{product.currency}</Text>
            <TextInput
              style={[styles.input, styles.priceInput]}
              value={product.price.toString()}
              onChangeText={(text) => handleChange('price', parseFloat(text) || 0)}
              placeholder="0.00"
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={[styles.formGroup, { flex: 1 }]}>
          <Text style={styles.label}>Sale Price</Text>
          <View style={styles.priceInputContainer}>
            <Text style={styles.currencySymbol}>{product.currency}</Text>
            <TextInput
              style={[styles.input, styles.priceInput]}
              value={product.salePrice?.toString() || ''}
              onChangeText={(text) => handleChange('salePrice', parseFloat(text) || undefined)}
              placeholder="0.00"
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>

      {/* Stock + Discount */}
      <View style={styles.row}>
        <View style={[styles.formGroup, { flex: 1, marginRight: 10 }]}>
          <Text style={styles.label}>Stock *</Text>
          <TextInput
            style={styles.input}
            value={product.stock.toString()}
            onChangeText={(text) => handleChange('stock', parseInt(text) || 0)}
            placeholder="0"
            keyboardType="numeric"
          />
        </View>

        <View style={[styles.formGroup, { flex: 1 }]}>
          <Text style={styles.label}>Discount (%)</Text>
          <TextInput
            style={styles.input}
            value={product.discount?.toString() || ''}
            onChangeText={(text) => handleChange('discount', text)}
            placeholder="0"
            keyboardType="numeric"
          />
        </View>
      </View>

      {/* Description */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Description *</Text>
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          value={product.description}
          onChangeText={(text) => handleChange('description', text)}
          placeholder="Product details and features"
          multiline
          numberOfLines={4}
        />
      </View>

      {/* Toggle Active */}
      <View style={styles.formGroup}>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => handleChange('isActive', !product.isActive)}
        >
          <View
            style={[
              styles.toggleCircle,
              product.isActive && styles.toggleCircleActive,
            ]}
          >
            <FontAwesome
              name={product.isActive ? 'check' : 'times'}
              size={14}
              color={product.isActive ? '#4CAF50' : '#F44336'}
            />
          </View>
          <Text style={styles.toggleText}>
            {product.isActive ? 'Active' : 'Inactive'}
          </Text>
        </TouchableOpacity>
      </View>
      </ScrollView>      
      {/* Submit */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Create Product</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateProduct;
