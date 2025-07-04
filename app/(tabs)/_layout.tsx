import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { View, Text, Image } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { red } from 'react-native-reanimated/lib/typescript/Colors';

// Icon component for tab bar
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

// Header for Home (index) screen
function HomeHeader() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#db3022', flex: 1, textAlign: 'left' }}>
        CLOTHS STORE
      </Text>
      <Image
        source={{
          uri: "https://img.freepik.com/photos-gratuite/serieux-jeune-homme-africain-debout-isole_171337-9633.jpg?semt=ais_items_boosted&w=740"
        }}
        style={{
          width: 32,
          height: 32,
          borderRadius: 16,
          marginLeft: 8,
          backgroundColor: '#ccc'
        }}
      />
    </View>
  );
}

// Centered header for other screens
function CenteredHeader() {
  return (
    <Text style={{ fontWeight: 'bold', fontSize: 20, flex: 1, textAlign: 'center', color: '#222' }}>
      CLOTHS STORE
    </Text>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: () => <HomeHeader />,
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Login"
        options={{
          headerTitle: () => <CenteredHeader />,
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="Register"
        options={{
          headerTitle: () => <CenteredHeader />,
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="ProductDetailPage"
        options={{
          headerTitle: () => <CenteredHeader />,
          tabBarButton: () => null,
        }}
      />
    </Tabs>
  );
}
