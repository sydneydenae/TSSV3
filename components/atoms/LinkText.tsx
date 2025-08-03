import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from 'components/atoms/Text';

interface LinkTextProps {
  text: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'subtle';
  className?: string;
}

const getVariantClasses = (variant: LinkTextProps['variant']): string => {
  switch (variant) {
    case 'primary':
      return 'text-blue-600 font-medium';
    case 'secondary':
      return 'text-gray-600 font-normal';
    case 'subtle':
      return 'text-gray-500 font-normal';
    default:
      return 'text-blue-600 font-medium';
  }
};

export const LinkText = ({ 
  text, 
  onPress, 
  variant = 'primary',
  className = '' 
}: LinkTextProps) => {
  const variantClasses = getVariantClasses(variant);
  const linkClasses = `${variantClasses} ${className}`;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text 
        variant="body" 
        className={linkClasses}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}; 