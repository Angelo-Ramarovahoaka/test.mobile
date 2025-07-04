import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, ScrollView, ImageBackground } from 'react-native';
import { styles } from './LoginStyle';
import { userStorage } from '@/data/users';
import { useNavigation } from '@react-navigation/native';
import * as Crypto from 'expo-crypto';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from './AuthContext'; // Add this import
import { AuthProvider } from './AuthContext'; // Import the AuthProvider

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const { login } =  useAuth()// Get the login function from AuthContext

  useEffect(() => {
    userStorage.getAllUsers().then(setUsers);
  }, []);

  const handleLogin = async () => {
    const hashedPassword = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );

    const user = users.find(
      u => u.email === email && u.password === hashedPassword
    );
    if (user) {
      try {
        // Call the login function from AuthContext
        await login({
          name: user.name,
          email: user.email,
          imageUri: user.imageUri || '',
        });
        navigation.navigate('Home'); // Navigate to Home after successful login
      } catch (error) {
        console.error('Login failed:', error.message);
      }
    } else {
      Alert.alert('Error', 'Invalid email or password');
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://cdn.sortiraparis.com/images/80/83043/417513-front-de-mode-les-createurs-qui-vous-veulent-du-bien.jpg' }}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Welcome Back!</Text>
          <Text style={styles.subHeaderText}>Please login to continue</Text>
        </View>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <View style={{ position: 'relative' }}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: 15,
                top: 12,
                zIndex: 1,
              }}
            >
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={22}
                color="#888"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.loginLinkText}>
              Don't have an account? <Text style={styles.loginLinkBold}>Register</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};