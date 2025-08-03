import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Text } from 'components/atoms/Text';
import { Ionicons } from '@expo/vector-icons';

interface PasswordFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  className?: string;
}

export const PasswordField = ({
  label,
  value,
  onChangeText,
  placeholder = 'Enter your password',
  className = ''
}: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View className={`mb-4 ${className}`}>
      <Text variant="body" className="mb-2 font-medium text-gray-700">
        {label}
      </Text>
      
      <View className="relative">
        <TextInput
          className="px-4 py-3 pr-12 border border-gray-300 rounded-lg bg-white text-gray-900 text-base"
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          autoCorrect={false}
        />
        
        <TouchableOpacity
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
          onPress={togglePasswordVisibility}
          activeOpacity={0.7}
        >
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={20}
            color="#6B7280"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}; 