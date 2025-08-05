import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from './screens/LoginScreen';
import { MarketplaceScreen } from 'screens/MarketplaceScreen';
import './global.css';
import BusinessPage from 'screens/BusinessPage';
import ProductPage from 'screens/ProductPage';
import type { RootStackParamList } from './type';
import CategoryScreen from 'screens/CategoryScreen';
import { ServicesScreen }from 'screens/ServicesScreen';


const Stack = createNativeStackNavigator<RootStackParamList>();

// Wrapper component to provide props to LoginScreen
const LoginScreenWrapper = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Your login logic here
      console.log('Login attempt:', { email, password });
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    console.log('Navigate to forgot password');
  };

  const handleSignUp = () => {
    console.log('Navigate to sign up');
  };

  const handleGoogleLogin = () => {
    console.log('Google login');
  };

  const handleAppleLogin = () => {
    console.log('Apple login');
  };

  return (
    <LoginScreen
      onLogin={handleLogin}
      onForgotPassword={handleForgotPassword}
      onSignUp={handleSignUp}
      onGoogleLogin={handleGoogleLogin}
      onAppleLogin={handleAppleLogin}
      loading={loading}
    />
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreenWrapper} />
        <Stack.Screen name="Marketplace" component={MarketplaceScreen} />
        <Stack.Screen name="BusinessPage" component={BusinessPage} />
        <Stack.Screen name="ProductPage" component={ProductPage} />
        <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
        <Stack.Screen name="ServicesScreen" component={ServicesScreen} />

      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
