import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginPage } from '@/components/pages/LoginPage/Login';
import { RegisterPage } from '@/components/pages/RegisterPage/Register';
import { HomePage } from '@/components/pages/HomePage/Home';
import { ProductDetailPage } from '@/components/pages/ProductDetailPage/ProductDetail';
import { useAuth } from '@/components/pages/LoginPage/AuthContext';
import CreateProduct from '../Wrapper/CreateProduct/CreateProduct';
import { ModifyProduct } from '@/components/pages/ModifyProductPage/ModifyProduct';

const Stack = createNativeStackNavigator();

export default function TabOneScreen() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null; // Or return a loading spinner
  }
  console.log('User in TabOneScreen:', user);
  const initialRoute = user ? 'Home' : 'Login';
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
      {user ? (
        // Authenticated screens
        <>
          <Stack.Screen name="Home">
            {() => <HomePage  user={user} />}
          </Stack.Screen>
          <Stack.Screen name="Modify">
            {() => <ModifyProduct user={user} />}
          </Stack.Screen>
          <Stack.Screen name="ProductDetailPage">
            {() => <ProductDetailPage user={user} />}
          </Stack.Screen>
          <Stack.Screen name="Profile">
            {() => <HomePage user={user} />}
          </Stack.Screen>
          <Stack.Screen name="CreateProduct">
            {() => <CreateProduct user={user} />}
          </Stack.Screen>
        </>

      ) : (
        // Auth screens
        <>
          <Stack.Screen name="Login">
            {() => <LoginPage user={user} />}
          </Stack.Screen>

          <Stack.Screen name="Register">
            {() => <RegisterPage user={user} />}
          </Stack.Screen>
        </>
      )}
    </Stack.Navigator>
  );
}
