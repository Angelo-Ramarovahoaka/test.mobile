import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { StatusBar, TouchableOpacity, View } from 'react-native';
import { myTheme } from '@/constants/theme';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useAuth } from '@/components/pages/LoginPage/AuthContext';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user, logout } = useAuth();

  return (
    <React.Fragment>
      <StatusBar 
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={Colors[colorScheme ?? 'light'].background}
      />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
          tabBarStyle: {
            backgroundColor: Colors[colorScheme ?? 'light'].background,
            borderTopWidth: 0,
            elevation: 0,
          },
          headerShown: useClientOnlyValue(false, true),
          headerStyle: {
            backgroundColor: Colors[colorScheme ?? 'light'].background,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            color: Colors[colorScheme ?? 'light'].text,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'HOME',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="home" color={color} size={size} />
            ),
            headerTitle: 'CLOTHS STORE',
          }}
        />
        
        {user && (
          <Tabs.Screen
            name="create"
            options={{
              title: 'CREATE',
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="plus-circle" color={color} size={size} />
              ),
              headerTitle: 'CLOTHS STORE',
            }}
          />
        )}

        <Tabs.Screen
          name="setting"
          options={{
            title: 'SETTING',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="cog" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </React.Fragment>
  );
}