import React from 'react';
import { View, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { Text } from 'components/atoms/Text';
import { Ionicons } from '@expo/vector-icons';

interface ProductCardProps {
  image: ImageSourcePropType;
  serviceName: string;
  businessName: string;
  businessId: string;
  price: string;
  location: string;
  onPress?: () => void;
  onBusinessNamePress?: (businessId: string) => void;
  className?: string;
}

export const ProductCard = ({
  image,
  serviceName,
  businessName,
  businessId,
  price,
  location,
  onPress,
  onBusinessNamePress,
  className = ''
}: ProductCardProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className={`bg-white rounded-lg shadow-sm border border-gray-100 ${className}`}
    >
      {/* Product Image */}
      <Image
        source={image}
        className="w-full h-48 rounded-t-lg"
        resizeMode="cover"
      />
      
      {/* Content Section */}
      <View className="p-4">
        {/* Service Name */}
        <Text variant="title" className="font-bold text-gray-900 mb-1">
          {serviceName}
        </Text>
        
        {/* Business Name */}
        <TouchableOpacity
          onPress={() => onBusinessNamePress?.(businessId)}
          activeOpacity={0.7}
          disabled={!onBusinessNamePress}
        >
          <Text 
            variant="body" 
            className={`text-gray-600 mb-2 ${onBusinessNamePress ? 'underline' : ''}`}
          >
            {businessName}
          </Text>
        </TouchableOpacity>
        
        {/* Price and Location Row */}
        <View className="flex-row justify-between items-center">
          {/* Price */}
          <Text variant="title" className="font-bold text-blue-600">
            {price}
          </Text>
          
          {/* Location */}
          <View className="flex-row items-center">
            <Ionicons
              name="location-outline"
              size={16}
              color="#6B7280"
              style={{ marginRight: 4 }}
            />
            <Text variant="caption" className="text-gray-500">
              {location}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}; 