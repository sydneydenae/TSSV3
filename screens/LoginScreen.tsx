import React, { useState } from 'react';
import { View, ScrollView, Alert, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Logo } from 'components/atoms/Logo';
import { Text } from 'components/atoms/Text';
import { FormField } from 'components/molecules/FormField';
import { PasswordField } from 'components/molecules/PasswordField';
import { ErrorMessage } from 'components/atoms/ErrorMessage';
import Button from 'components/atoms/Button';
import { LinkText } from 'components/atoms/LinkText';
import { SocialLoginButton } from 'components/atoms/SocialLoginButton';

interface LoginScreenProps {
  onLogin: (email: string, password: string) => void;
  onForgotPassword: () => void;
  onSignUp: () => void;
  onGoogleLogin: () => void;
  onAppleLogin: () => void;
  loading?: boolean;
}

export const LoginScreen = ({
  onLogin,
  onForgotPassword,
  onSignUp,
  onGoogleLogin,
  onAppleLogin,
  loading = false
}: LoginScreenProps) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

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

  const handleLogin = () => {
    if (validateForm()) {
      onLogin(email, password);
      navigation.navigate('Marketplace' as never);
    }
  };

  const handleGoogleLogin = () => {
    onGoogleLogin();
  };

  const handleAppleLogin = () => {
    onAppleLogin();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        <View className="justify-center items-center px-6 py-8">
          {/* Logo Section */}
          <View className="items-center mb-12">
            <Logo 
              source={require('../assets/logo.png')} 
              size="large"
            />
          </View>

          {/* Header */}
          <View className="mb-8">
            <Text variant="heading" className="text-center mb-2 text-gray-900">
              Welcome Back
            </Text>
            <Text variant="body" className="text-center text-gray-600">
              Sign in to your account
            </Text>
          </View>

          {/* Form Section */}
          <View className="mb-8">
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
              <ErrorMessage message={errors.email} />
            )}

            <PasswordField
              label="Password"
              value={password}
              onChangeText={setPassword}
            />
            {errors.password && (
              <ErrorMessage message={errors.password} />
            )}

            {errors.general && (
              <ErrorMessage message={errors.general} />
            )}
          </View>

          {/* Login Button */}
          <Button
            title={loading ? 'Signing In...' : 'Sign In'}
            onPress={handleLogin}
            disabled={loading}
            className="mb-6"
          />

          {/* Forgot Password Link */}
          <View className="items-center mb-8">
            <LinkText
              text="Forgot your password?"
              onPress={onForgotPassword}
              variant="secondary"
            />
          </View>

          {/* Divider */}
          <View className="flex-row items-center mb-8">
            <View className="flex-1 h-px bg-gray-300" />
            <Text variant="body" className="mx-4 text-gray-500">
              or
            </Text>
            <View className="flex-1 h-px bg-gray-300" />
          </View>

          {/* Social Login Buttons */}
          <View className="space-y-4 mb-8">
            <SocialLoginButton
              provider="Google"
              onPress={handleGoogleLogin}
            />
            <SocialLoginButton
              provider="Apple"
              onPress={handleAppleLogin}
            />
          </View>

          {/* Sign Up Link */}
          <View className="items-center">
            <View className="flex-row items-center">
              <Text variant="body" className="text-gray-600">
                Don't have an account?{' '}
              </Text>
              <LinkText
                text="Sign up"
                onPress={onSignUp}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}; 