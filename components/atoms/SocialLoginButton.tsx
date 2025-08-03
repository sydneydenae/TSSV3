import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from 'components/atoms/Text';
import { Ionicons } from '@expo/vector-icons';

type Provider = 'Google' | 'Apple';

interface SocialLoginButtonProps {
  provider: Provider;
  onPress: () => void;
  className?: string;
}

const getProviderConfig = (provider: Provider) => {
  switch (provider) {
    case 'Google':
      return {
        icon: 'logo-google',
        text: 'Continue with Google',
        bgColor: 'bg-white',
        textColor: 'text-gray-700',
        borderColor: 'border-gray-300',
        iconColor: '#4285F4'
      };
    case 'Apple':
      return {
        icon: 'logo-apple',
        text: 'Continue with Apple',
        bgColor: 'bg-black',
        textColor: 'text-white',
        borderColor: 'border-black',
        iconColor: '#FFFFFF'
      };
    default:
      return {
        icon: 'logo-google',
        text: 'Continue with Google',
        bgColor: 'bg-white',
        textColor: 'text-gray-700',
        borderColor: 'border-gray-300',
        iconColor: '#4285F4'
      };
  }
};

export const SocialLoginButton = ({ 
  provider, 
  onPress, 
  className = '' 
}: SocialLoginButtonProps) => {
  const config = getProviderConfig(provider);
  
  const buttonClasses = `
    flex-row items-center justify-center px-6 py-3 rounded-lg border
    ${config.bgColor} ${config.borderColor} ${className}
  `;

  return (
    <TouchableOpacity
      className={buttonClasses}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Ionicons
        name={config.icon as any}
        size={20}
        color={config.iconColor}
        style={{ marginRight: 12 }}
      />
      <Text 
        variant="body" 
        className={`font-medium ${config.textColor}`}
      >
        {config.text}
      </Text>
    </TouchableOpacity>
  );
}; 