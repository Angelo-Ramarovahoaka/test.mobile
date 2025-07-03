import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from './styles';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  showUser?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'My App',
  showBackButton = false,
  onBackPress,
  showUser = false,
}) => {
  return (
    <View style={styles.container}>
      {showBackButton && (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
      )}
      
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};