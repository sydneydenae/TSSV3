import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Header } from 'components/organisms/Header';
import { CategoryView } from '../components/organisms/CategoryView';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../type';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'CategoryScreen'>;

export default function CategoryScreen() {
  const navigation = useNavigation<NavigationProp>();

  const serviceCategories = ['Hairstylist', 'Barber', 'Nail Techs', 'Makeup Artist'];
  const productCategories = ['Clothes', 'Shoes', 'Accessories']; // Add as needed

  // Define raw categories
  const services = [
    { id: '1', label: 'Hairstylist' },
    { id: '2', label: 'Barber' },
    { id: '3', label: 'Clothes' },
    { id: '4', label: 'Nail Techs' },
    { id: '5', label: 'Makeup Artist' },
    { id: '6', label: 'Clothes' },
    { id: '7', label: 'Shoes' },
    { id: '8', label: 'Accessories' },
    // Add more categories as needed
  ];

  // Map categories with onPress handlers that navigate to ServicesScreen
  const categories = services.map((category) => ({
    ...category,
    onPress: () => {
        const label = category.label;

        if (serviceCategories.includes(label)) {
        navigation.navigate('ServicesScreen', { initialCategory: label });
        } else if (productCategories.includes(label)) {
        navigation.navigate('Marketplace', { initialCategory: label });
        } else {
        alert('Unknown category');
        }}}));

  const handleCartPress = () => {
    alert('Cart pressed');
  };

  const navMenuItems = [
    { label: 'Products', onPress: () => navigation.navigate('Marketplace', { initialCategory: 'All' }) },
    { label: 'Services', onPress: () => navigation.navigate('ServicesScreen', { initialCategory: 'All' }) },
    { label: 'All Categories', onPress: () => navigation.navigate('CategoryScreen') },
    { label: 'Logout', onPress: () => alert('Logged out') },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* Header with title and cart */}
      <Header title="Categories" onCartPress={handleCartPress} navMenuItems={navMenuItems} />

      {/* Category Grid */}
      <CategoryView categories={categories} numColumns={1} />
    </SafeAreaView>
  );
}
