import React from 'react';
import { View, Image, ImageSourcePropType } from 'react-native';
import { Text } from 'components/atoms/Text';

interface HeroProps {
  title: string;
  subtitle: string;
  image: ImageSourcePropType;
  ctaButton?: React.ReactNode;
}

export const Hero = ({ 
  title, 
  subtitle, 
  image, 
  ctaButton 
}: HeroProps) => {
  return (
    <View className="flex-1 justify-center items-center px-6 py-8 bg-gray-50">
      {/* Image Section */}
      <View className="mb-8 w-full max-w-xs">
        <Image
          source={image}
          className="w-full h-64 rounded-lg"
          resizeMode="cover"
        />
      </View>
      
      {/* Content Section */}
      <View className="items-center mb-8">
        <Text variant="heading" className="text-center mb-4 text-gray-900">
          {title}
        </Text>
        <Text variant="body" className="text-center text-gray-600 leading-relaxed">
          {subtitle}
        </Text>
      </View>
      
      {/* CTA Button Section */}
      {ctaButton && (
        <View className="w-full max-w-xs">
          {ctaButton}
        </View>
      )}
    </View>
  );
};
