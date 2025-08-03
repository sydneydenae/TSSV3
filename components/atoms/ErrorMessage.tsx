import React from 'react';
import { View } from 'react-native';
import { Text } from 'components/atoms/Text';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export const ErrorMessage = ({ 
  message, 
  className = '' 
}: ErrorMessageProps) => {
  if (!message) return null;

  return (
    <View className={`mt-2 ${className}`}>
      <Text 
        variant="caption" 
        className="text-red-500 text-sm leading-tight"
      >
        {message}
      </Text>
    </View>
  );
};
