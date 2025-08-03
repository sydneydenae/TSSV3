import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Logo } from 'components/atoms/Logo';
import { NavItem } from 'components/atoms/NavItem';
import { Ionicons } from '@expo/vector-icons';

interface NavItem {
  label: string;
  onPress: () => void;
}

interface HeaderProps {
  navItems?: NavItem[];
  onCartPress?: () => void;
  className?: string;
}

export const Header = ({ 
  navItems = [],
  onCartPress, 
  className = '' 
}: HeaderProps) => {
  return (
    <View className={`flex-row justify-between items-center px-6 py-4 bg-white border-b border-gray-200 ${className}`}>
      {/* Left: Logo */}
      <View className="flex-1">
        <Logo 
          source={require('../../assets/logo.png')} 
          size="medium"
        />
      </View>
      
      {/* Center: Navigation Items */}
      {navItems.length > 0 && (
        <View className="flex-row items-center space-x-2">
          {navItems.map((item, index) => (
            <NavItem
              key={`${item.label}-${index}`}
              label={item.label}
              onPress={item.onPress}
              active={false}
            />
          ))}
        </View>
      )}
      
      {/* Right: Cart Icon */}
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