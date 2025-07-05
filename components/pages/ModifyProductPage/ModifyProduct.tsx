import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet,
  Alert,
  Image,
  ActivityIndicator
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Product } from '@/data/product';
import { productStorage } from '@/data/product';
import { styles } from './ModifyProductSTyle';

type RootStackParamList = {
  ModifyProduct: { product: Product };
  ProductDetailPage: { id: number };
};

type ModifyProductRouteProp = RouteProp<RootStackParamList, 'ModifyProduct'>;
type ModifyProductNavProp = StackNavigationProp<RootStackParamList, 'ModifyProduct'>;

export const ModifyProduct = () => {
  const route = useRoute<ModifyProductRouteProp>();
  const navigation = useNavigation<ModifyProductNavProp>();
  const { product } = route.params;

  const [formData, setFormData] = useState<Product>(product);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(product.image || null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Request permissions when component mounts
  useEffect(() => {
    (async () => {
      const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (mediaStatus !== 'granted' || cameraStatus !== 'granted') {
        Alert.alert(
          'Permission required',
          'We need camera and gallery permissions to upload images.'
        );
      }
    })();
  }, []);

  const pickImage = async () => {
    try {
      setIsUploadingImage(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets?.[0]?.uri) {
        const selectedAsset = result.assets[0];
        setImageUri(selectedAsset.uri);
        handleChange('image', selectedAsset.uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to select image');
    } finally {
      setIsUploadingImage(false);
    }
  };

  const takePhoto = async () => {
    try {
      setIsUploadingImage(true);
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets?.[0]?.uri) {
        const selectedAsset = result.assets[0];
        setImageUri(selectedAsset.uri);
        handleChange('image', selectedAsset.uri);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo');
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleChange = (field: keyof Product, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      updatedAt: new Date().toISOString()
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Product name is required');
      return;
    }

    if (formData.price <= 0) {
      Alert.alert('Error', 'Price must be greater than 0');
      return;
    }

    if (formData.salePrice && formData.salePrice >= formData.price) {
      Alert.alert('Error', 'Sale price must be less than regular price');
      return;
    }

    if (!imageUri) {
      Alert.alert('Error', 'Please select a product image');
      return;
    }

    try {
      setIsLoading(true);
      await productStorage.updateProduct(formData);
      Alert.alert('Success', 'Product updated successfully');
      navigation.navigate('ProductDetailPage', { id: formData.id });
    } catch (error) {
      console.error('Update error:', error);
      Alert.alert('Error', 'Failed to update product');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.header}>Edit Product</Text>
      
      {/* Product Name */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Product Name</Text>
        <TextInput
          style={styles.input}
          value={formData.name}
          onChangeText={(text) => handleChange('name', text)}
          placeholder="Enter product name"
        />
      </View>

      {/* Product Category */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Category</Text>
        <TextInput
          style={styles.input}
          value={formData.productCategory}
          onChangeText={(text) => handleChange('productCategory', text)}
          placeholder="Enter category"
        />
      </View>

      {/* Price */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Price</Text>
        <View style={styles.priceInputContainer}>
          <Text style={styles.currencySymbol}>{formData.currency || '$'}</Text>
          <TextInput
            style={[styles.input, styles.priceInput]}
            value={formData.price.toString()}
            onChangeText={(text) => handleChange('price', parseFloat(text) || 0)}
            keyboardType="decimal-pad"
            placeholder="0.00"
          />
        </View>
      </View>

      {/* Sale Price */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Sale Price (optional)</Text>
        <View style={styles.priceInputContainer}>
          <Text style={styles.currencySymbol}>{formData.currency || '$'}</Text>
          <TextInput
            style={[styles.input, styles.priceInput]}
            value={formData.salePrice?.toString() || ''}
            onChangeText={(text) => {
              if (text === '') {
                handleChange('salePrice', null);
              } else {
                const numValue = parseFloat(text);
                if (!isNaN(numValue)) {
                  handleChange('salePrice', numValue);
                }
              }
            }}
            keyboardType="decimal-pad"
            placeholder="0.00"
          />
        </View>
      </View>

      {/* Stock */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Stock Quantity</Text>
        <TextInput
          style={styles.input}
          value={formData.stock.toString()}
          onChangeText={(text) => handleChange('stock', parseInt(text) || 0)}
          keyboardType="numeric"
          placeholder="Enter quantity"
        />
      </View>

      {/* Description */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          value={formData.description}
          onChangeText={(text) => handleChange('description', text)}
          placeholder="Enter product description"
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Product Status</Text>
        <TouchableOpacity
          style={[
            styles.statusButton,
            formData.isActive && styles.statusButtonActive
          ]}
          onPress={() => handleChange('isActive', !formData.isActive)}
        >
          <Text style={styles.statusText}>
            {formData.isActive ? 'Active' : 'Inactive'}
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Image Selection */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Product Image</Text>
        
        {imageUri && (
          <Image 
            source={{ uri: imageUri }} 
            style={styles.imagePreview}
            resizeMode="cover"
          />
        )}

        <View style={styles.imageButtonsContainer}>
          <TouchableOpacity 
            style={styles.imageButton}
            onPress={pickImage}
            disabled={isUploadingImage}
          >
            {isUploadingImage ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <MaterialIcons name="photo-library" size={20} color="#fff" />
                <Text style={styles.imageButtonText}>Choose Photo</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.imageButton, styles.cameraButton]}
            onPress={takePhoto}
            disabled={isUploadingImage}
          >
            {isUploadingImage ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <MaterialIcons name="photo-camera" size={20} color="#fff" />
                <Text style={styles.imageButtonText}>Take Photo</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Submit Button */}
      <TouchableOpacity 
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <MaterialIcons name="save" size={20} color="#fff" />
            <Text style={styles.submitButtonText}>Save Changes</Text>
          </>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};