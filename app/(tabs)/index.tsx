import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginPage } from '@/components/pages/LoginPage/Login';
import { RegisterPage } from '@/components/pages/RegisterPage/Register';
import { HomePage } from '@/components/pages/HomePage/Home';
import { ProductDetailPage } from '@/components/pages/ProductDetailPage/ProductDetail';
import { useAuth } from '@/components/pages/LoginPage/AuthContext';
import CreateProduct from '../Wrapper/CreateProduct/CreateProduct';

const Stack = createNativeStackNavigator();

export default function TabOneScreen() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null; // Or return a loading spinner
  }
  console.log('User in TabOneScreen:', user);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        // Authenticated screens
        <>
          <Stack.Screen name="Home">
            {() => <HomePage  user={user} />}
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

export const myTheme = {
  dark: false,
  colors: {
    primary: '#E53935',           // Main color for primary actions (e.g., buttons)
    background: '#FFFFFF',        // Main background
    card: '#F5F5F5',              // Light gray for category sections
    text: '#212121',              // Main text color (dark gray/black)
    border: '#E0E0E0',            // Subtle border color (light gray)
    notification: '#FF3B30',      // Alerts or important notifications (if any)
  },
  Text: {
      h1Style: {
        fontWeight: '700',
        fontSize: 34
      },
      h2Style: {
        fontWeight: '300',
      },
      h3Style: {
        fontWeight: '300',
        fontSize: 14
      },
      h4Style: {
        fontWeight: '300',
        fontSize: 11
      },
    },
    Button: {
      buttonStyle: {
        backgroundColor: '#DB3022',
        borderRadius: 25,
        paddingVertical: 15,
      },
      containerStyle: {
        height: 48,
      },
      titleStyle: {
        fontSize: 14
      }
    }
};
