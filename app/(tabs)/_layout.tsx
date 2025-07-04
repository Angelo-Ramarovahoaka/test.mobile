import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, View, ActivityIndicator, Image } from 'react-native';
import { myTheme } from '@/theme';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useAuth } from '@/components/pages/LoginPage/AuthContext'; 

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user, isLoading } = useAuth(); // Get user and loading state

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

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
          title: 'CLOTHS STORE',
          headerTitleStyle: {
            fontWeight: myTheme.components.Text.h1Style.fontWeight,
            fontSize: myTheme.components.Text.h2Style.fontSize,
            color: myTheme.colors.secondary,
          },
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => {
            if (!user) return null;

            return (
              <View style={{ flexDirection: 'row', marginRight: 10 }}>
                <Link href="/Wrapper/CreateProduct/CreateProduct" asChild>
                  <Pressable style={{ marginRight: 10 }}>
                    {({ pressed }) => (
                      <FontAwesome
                        name="plus-square"
                        size={25}
                        color={Colors[colorScheme ?? 'light'].text}
                        style={{ opacity: pressed ? 0.5 : 1 }}
                      />
                    )}
                  </Pressable>
                </Link>
                <Link 
                href="/Wrapper/Profile/Profile" asChild>
                  <Pressable>
                    {({ pressed }) => (
                      <Image
                        source={{ uri : user.imageUri ? { uri : user.imageUri } : 'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o='}}
                        style={{ 
                          width: 30, 
                          height: 30, 
                          borderRadius: 15, 
                          opacity: pressed ? 0.5 : 1
                        }}
                      />
                    )}
                  </Pressable>
                </Link>
              </View>
            );
          },
        }}
      />

      <Tabs.Screen
        name="two"
        options={{
          title: user ? 'Profile' : 'Login', // Dynamic title
          tabBarIcon: ({ color }) => (
            <TabBarIcon 
              name={user ? "user" : "sign-in"} // Different icon based on auth state
              color={color} 
            />
          ),
        }}
      />
    </Tabs>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}