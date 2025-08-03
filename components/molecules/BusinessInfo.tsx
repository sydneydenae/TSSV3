import React from 'react';
import { View } from 'react-native';
import { Text } from 'components/atoms/Text';

type BusinessInfoProps = {
  name: string;
  location: string;
  type: string;
  description: string;
};

export const BusinessInfo = ({
  name,
  location,
  type,
  description
}: BusinessInfoProps) => {
  return (
    <View className="p-6 bg-white">
      {/* Business Name */}
      <Text variant="heading" className="text-2xl font-bold text-gray-900 mb-2">
        {name}
      </Text>
      
      {/* Location and Type Row */}
      <View className="flex-row items-center justify-between mb-4">
        <Text variant="body" className="text-sm text-gray-500">
          {location}
        </Text>
        
        <View className="bg-gray-200 px-3 py-1 rounded-full">
          <Text variant="caption" className="text-xs text-gray-700 font-medium">
            {type}
          </Text>
        </View>
      </View>
      
      {/* Description */}
      <Text variant="body" className="text-base text-gray-800 leading-relaxed">
        {description}
      </Text>
    </View>
  );
}; 