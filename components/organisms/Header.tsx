import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Logo } from 'components/atoms/Logo';
import { Ionicons } from '@expo/vector-icons';

interface HeaderProps {
  onCartPress?: () => void;
  className?: string;
}

export const Header = ({ 
  onCartPress, 
  className = '' 
}: HeaderProps) => {
  return (
    <View className={`flex-row justify-between items-center px-6 py-4 bg-white border-b border-gray-200 ${className}`}>
      {/* Logo Section */}
      <View className="flex-1">
        <Logo 
          source={require('../../assets/logo.png')} 
          size="medium"
        />
      </View>
      
      {/* Cart Icon */}
      <TouchableOpacity
        onPress={onCartPress}
        activeOpacity={0.7}
        className="p-2"
      >
        <Ionicons
          name="cart-outline"
          size={24}
          color="#374151"
        />
      </TouchableOpacity>
    </View>
  );
}; 