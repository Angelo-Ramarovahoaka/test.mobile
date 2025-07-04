import React from 'react';
import { View, Text, Image } from 'react-native';
import { myTheme } from '@/theme';
export function HomeHeader() {
  return (
    <View style={{display: 'flex', justifyContent: 'space-between' , flexDirection: 'row', alignItems: 'center', gap: '45%'}}>
      <Text style={{ 
        textAlign: 'center',
        fontWeight: myTheme.components.Text.h1Style.fontWeight,
        fontSize: myTheme.components.Text.h2Style.fontSize,
        color: myTheme.colors.secondary,
    }}>
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
export function CenteredHeader() {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ 
        textAlign: 'center',
        fontWeight: myTheme.components.Text.h1Style.fontWeight,
        fontSize: myTheme.components.Text.h2Style.fontSize,
        color: myTheme.colors.secondary,
    }}>
        CLOTHS STORE
    </Text>
    </View>

  );
}