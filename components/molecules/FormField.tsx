import React from 'react';
import { View, TextInput, TextInputProps } from 'react-native';
import { Text } from 'components/atoms/Text';

interface FormFieldProps extends Omit<TextInputProps, 'onChangeText'> {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  className?: string;
}

export const FormField = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  className = '',
  ...props
}: FormFieldProps) => {
  return (
    <View className={`mb-4 ${className}`}>
      <Text variant="body" className="mb-2 font-medium text-gray-700">
        {label}
      </Text>
      <TextInput
        className="px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 text-base"
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        autoCorrect={false}
        {...props}
      />
    </View>
  );
};
