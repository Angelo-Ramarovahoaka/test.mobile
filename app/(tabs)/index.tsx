import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { HomePage } from '@/pages/HomePage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';

const Stack = createNativeStackNavigator();

export default function TabOneScreen() {
  return (
    <Stack.Navigator initialRouteName="Register">
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="Register" component={RegisterPage} />
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="ProductDetailPage" component={ProductDetailPage} />
    </Stack.Navigator>
  );
}
