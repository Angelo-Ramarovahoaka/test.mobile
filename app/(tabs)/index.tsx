import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { HomePage } from '@/pages/HomePage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
const Stack = createNativeStackNavigator();

export default function TabOneScreen() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginPage}
      />
      <Stack.Screen
        name="Register"
        component={RegisterPage}
      />
      <Stack.Screen
        name="ProductDetailPage"
        component={ProductDetailPage}
      />
      <Stack.Screen
        name="Home"
        component={HomePage}
      />
    </Stack.Navigator>
  );
}

export const myTheme = {
  dark: false,
  colors: {
    primary: '#E53935',           // Vibrant red for highlights (e.g. "SUMMER SALES", active tab, cart icon)
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
