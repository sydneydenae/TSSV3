import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { FormField } from 'components/molecules/FormField';
import Button from 'components/atoms/Button';
import { Text } from 'components/atoms/Text';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  loading?: boolean;
}

export const LoginForm = ({ onSubmit, loading = false }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(email, password);
    }
  };

  return (
    <View className="w-full max-w-sm mx-auto p-6">
      {/* Header */}
      <View className="mb-8">
        <Text variant="heading" className="text-center mb-2 text-gray-900">
          Welcome Back
        </Text>
        <Text variant="body" className="text-center text-gray-600">
          Sign in to your account
        </Text>
      </View>

      {/* Form Fields */}
      <View className="space-y-4 mb-6">
        <FormField
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {errors.email && (
          <Text variant="caption" className="text-red-500 ml-2">
            {errors.email}
          </Text>
        )}

        <FormField
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {errors.password && (
          <Text variant="caption" className="text-red-500 ml-2">
            {errors.password}
          </Text>
        )}
      </View>

      {/* Submit Button */}
      <Button
        title={loading ? 'Signing In...' : 'Sign In'}
        onPress={handleSubmit}
        disabled={loading}
        className="w-full"
      />

      {/* Forgot Password Link */}
      <View className="mt-4">
        <Text 
          variant="body" 
          className="text-center text-blue-600 underline"
          onPress={() => Alert.alert('Forgot Password', 'Password reset functionality would go here')}
        >
          Forgot your password?
        </Text>
      </View>
    </View>
  );
};
