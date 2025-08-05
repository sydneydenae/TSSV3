import React, { useEffect, useState } from 'react';
import { View, FlatList, StatusBar, ImageSourcePropType } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header } from 'components/organisms/Header';
import { SearchBar } from 'components/molecules/SearchBar';
import { CategoryTabs } from 'components/molecules/CategoryTabs';
import * as ServiceCardModule from 'components/molecules/ServiceCard';
import { ServiceCard } from '../components/molecules/ServiceCard';
import { Text } from 'components/atoms/Text';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'type';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';

interface ImageWithPrice {
  image: ImageSourcePropType;
  price: string;
}

interface Service {
  id: string;
  businessName: string;
  businessType: string;
  businessLocation: string;
  images: ImageWithPrice[];
  onPress?: () => void;
}

interface ServicesScreenProps {
  onCartPress?: () => void;
  services?: Service[];
}

const defaultServices: Service[] = [
  {
    id: '1',
    businessName: 'Elegant Salon',
    businessType: 'Hairstylist',
    businessLocation: 'Downtown',
    images: [
      { image: require('../assets/service1-1.png'), price: '$50' },
      { image: require('../assets/service1-2.png'), price: '$70' },
    ],
  },
  {
    id: '2',
    businessName: 'Urban Barber Shop',
    businessType: 'Barber',
    businessLocation: 'City Center',
    images: [
      { image: require('../assets/service2-1.png'), price: '$40' },
      { image: require('../assets/service2-2.png'), price: '$55' },
      { image: require('../assets/service2-3.png'), price: '$65' },
    ],
  },
  {
    id: '3',
    businessName: 'Style & Nails',
    businessType: 'Nail Techs',
    businessLocation: 'Suburbs',
    images: [
      { image: require('../assets/service3-1.png'), price: '$30' },
      { image: require('../assets/service3-2.png'), price: '$45' },
    ],
  },
];

const categories = ['All', 'Hairstylist', 'Barber', 'Nail Techs', 'Makeup Artist'];

export const ServicesScreen = ({
  onCartPress,
  services = defaultServices
}: ServicesScreenProps) => {
  const route = useRoute();
  const { initialCategory } = route.params as { initialCategory?: string };
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredServices, setFilteredServices] = useState(services);
  useEffect(() => {
    filterServices(searchQuery, initialCategory || 'All');
  }, [initialCategory]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterServices(query, selectedCategory);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    filterServices(searchQuery, category);
  };

  const filterServices = (query: string, category: string) => {
    let filtered = services;

    if (category !== 'All') {
      filtered = filtered.filter(service =>
        service.businessType.toLowerCase().includes(category.toLowerCase()) ||
        service.businessName.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (query.trim() !== '') {
      filtered = filtered.filter(service =>
        service.businessName.toLowerCase().includes(query.toLowerCase()) ||
        service.businessType.toLowerCase().includes(query.toLowerCase()) ||
        service.businessLocation.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredServices(filtered);
  };

  const renderService = ({ item }: { item: Service }) => (
    <ServiceCard
      key={item.id}
      businessName={item.businessName}
      businessType={item.businessType}
      businessLocation={item.businessLocation}
      images={item.images}
      onPress={() => {
      }}
      className="mb-4"
    />
  );

  const navMenuItems = [
    { label: 'Products', onPress: () => navigation.navigate('Marketplace', { initialCategory: 'All' }) },
    { label: 'Services', onPress: () => navigation.navigate('ServicesScreen', { initialCategory: 'All' }) },
    { label: 'All Categories', onPress: () => navigation.navigate('CategoryScreen') },
    { label: 'Logout', onPress: () => alert('Logged out') }
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* Header */}
      <Header title="Services" onCartPress={onCartPress} navMenuItems={navMenuItems} />

      {/* Search and Categories Section */}
      <View className="bg-white border-b border-gray-100">
        <View className="px-4 py-4">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search for services..."
            className="mb-4"
          />
        </View>

        <CategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
          className="pb-2"
        />
      </View>

      {/* Services List */}
      <FlatList
        data={filteredServices}
        renderItem={renderService}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center py-12">
            <Text variant="body" className="text-gray-500 text-center">
              No services found. Try adjusting your search or category filter.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};
