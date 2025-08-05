import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'components/atoms/Text';
import { Ionicons } from '@expo/vector-icons';

interface DetailHeaderProps {
  onBackPress?: () => void;
  title?: string;
  onCartPress?: () => void;
  className?: string;
}

export const DetailHeader = ({ 
  onBackPress,
  title,
  onCartPress, 
  className = '' 
}: DetailHeaderProps) => {
  return (
    <View className={`flex-row justify-between items-center px-6 py-4 bg-white border-b border-gray-200 ${className}`}>
      {/* Left: Back Button with Optional Title */}
      <View className="flex-1 flex-row items-center">
        <TouchableOpacity
          onPress={onBackPress}
          activeOpacity={0.7}
          className="p-2 mr-2"
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color="#374151"
          />
        </TouchableOpacity>
        
        {title && (
          <Text variant="title" className="text-lg font-semibold text-gray-900">
            {title}
          </Text>
        )}
      </View>
      
      {/* Right: Cart Icon */}
      <View className="flex-1 items-end">
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
    </View>
  );
}; 