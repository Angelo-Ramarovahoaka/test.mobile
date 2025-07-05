import React from 'react';
import { AuthProvider } from '@/components/pages/LoginPage/AuthContext';
import { Stack } from 'expo-router';

function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}

export default RootLayout;