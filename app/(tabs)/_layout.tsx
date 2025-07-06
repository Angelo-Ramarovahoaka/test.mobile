import React, { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { StatusBar, ActivityIndicator, View } from 'react-native';
import { myTheme } from '@/constants/theme';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/app/components/useColorScheme';
import { useClientOnlyValue } from '@/app/components/useClientOnlyValue';
import { useAuth } from '@/app/components/pages/LoginPage/AuthContext';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user, isLoading } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <React.Fragment>
      <StatusBar 
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={Colors[colorScheme ?? 'light'].background}
      />
      <Tabs
        key={refreshKey}
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
        {/* Onglet HOME toujours visible */}
        <Tabs.Screen
          name="index"
          options={{
            title: user ? 'HOME' : 'CLOTHS STORE',
            tabBarIcon: ({ color, size }) => (
              user ? <FontAwesome name="home" color={color} size={size} /> : null
            ),
            headerTitle: 'CLOTHS STORE',
            tabBarLabelStyle: {
              fontSize: 20,                  
              fontWeight: '600',             
              marginBottom: 4,        
            },
          }}
          listeners={({ navigation }) => ({
            tabPress: () => setRefreshKey(prev => prev + 1),
          })}
        />
        
        {/* Onglet CREATE - seulement visible quand connecté */}
        <Tabs.Screen
          name="create"
          options={{
            title: 'CREATE',
            href: user ? '' : null, // Cache l'onglet si non connecté
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="plus-circle" color={color} size={size} />
            ),
            headerTitle: 'CLOTHS STORE',
          }}
          listeners={({ navigation }) => ({
            tabPress: () => setRefreshKey(prev => prev + 1),
          })}
        />

        {/* Onglet SETTING - seulement visible quand connecté */}
        <Tabs.Screen
          name="setting"
          options={{
            title: 'SETTING',
            href: user ? '' : null, // Cache l'onglet si non connecté
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="cog" color={color} size={size} />
            ),
          }}
          listeners={({ navigation }) => ({
            tabPress: () => setRefreshKey(prev => prev + 1),
          })}
        />
      </Tabs>
    </React.Fragment>
  );
}