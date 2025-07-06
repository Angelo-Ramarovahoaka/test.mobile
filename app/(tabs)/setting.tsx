import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '@/app/components/pages/LoginPage/AuthContext';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { styles } from '../components/pages/Logout/LogoutStyle';
import { useNavigation } from '@react-navigation/native'; // FIXED: useNavigation from correct package
import type { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Profile: { userId: string };
};

type ProfileNavProp = StackNavigationProp<RootStackParamList, 'Profile'>;

const Logout = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const navigation = useNavigation<ProfileNavProp>(); // FIXED: use inside component with correct typing

  const handleUserPress = (userId: string) => {
    // router.replace(`/Profile/Profile?userId=${userId}`);
    router.replace(`/components/pages/Profile/Profile?userId=${userId}`);

  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            logout();
            router.replace('../../.'); // Adjust path if needed
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Please login to view your profile</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          {user.imageUri ? (
            <Image source={{ uri: user.imageUri }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <FontAwesome name="user" size={50} color="#fff" />
            </View>
          )}
        </View>

        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleUserPress(user.id)}>
          <FontAwesome name="user" size={20} color="#555" />
          <Text style={styles.menuText}>View Profile</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
        <FontAwesome name="sign-out" size={20} color="#E53935" />
      </TouchableOpacity>
    </View>
  );
};

export default Logout;
