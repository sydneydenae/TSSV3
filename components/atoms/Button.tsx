import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  className?: string;
  disabled?: boolean;
}

export default function Button({ 
  title, 
  onPress, 
  className = '', 
  disabled = false 
}: ButtonProps) {
  const baseClasses = 'px-6 py-3 rounded-lg items-center justify-center';
  const defaultClasses = 'bg-blue-500';
  const disabledClasses = 'bg-gray-400';
  const textClasses = 'text-white font-semibold text-base';
  const disabledTextClasses = 'text-gray-600';

  const buttonClasses = `${baseClasses} ${disabled ? disabledClasses : defaultClasses} ${className}`;
  const textStyleClasses = disabled ? disabledTextClasses : textClasses;

  return (
    <TouchableOpacity
      className={buttonClasses}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={disabled ? 1 : 0.7}
    >
      <Text className={textStyleClasses}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
