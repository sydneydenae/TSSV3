import React, { useEffect, useState } from 'react';
import { View, FlatList, StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Header } from 'components/organisms/Header';
import { SearchBar } from 'components/molecules/SearchBar';
import { CategoryTabs } from 'components/molecules/CategoryTabs';
import { ProductCard } from 'components/molecules/ProductCard';
import { Text } from 'components/atoms/Text';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../type';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Product {
  productId: string;
  image: any;
  serviceName: string;
  businessName: string;
  businessId: string;
  price: string;
  location: string;
}

interface MarketplaceScreenProps {
  onCartPress?: () => void;
  onProductPress?: (product: Product) => void;
  products?: Product[];
}

const defaultProducts: Product[] = [
  {
    productId: '1',
    image: require('../assets/clothes1.png'),
    serviceName: 'HRC Tees',
    businessName: 'High Roller Club Clothes',
    businessId: 'business-1',
    price: '$25',
    location: 'Towers'
  },
  {
    productId: '2',
    image: require('../assets/clothes2.png'),
    serviceName: 'HRC Sweats',
    businessName: 'High Roller Club Clothes',
    businessId: 'business-1',
    price: '$150',
    location: 'University District'
  },
  {
    productId: '3',
    image: require('../assets/jewelry.jpg'),
    serviceName: 'Waist Beads',
    businessName: 'Jays Jewelry',
    businessId: 'business-2',
    price: '$10',
    location: 'Campus Center'
  },
  {
    productId: '4',
    image: require('../assets/rug.jpg'),
    serviceName: 'Stitch Rug',
    businessName: 'Elles Rugs',
    businessId: 'business-3',
    price: '$75',
    location: 'Towers'
  },
  {
    productId: '5',
    image: require('../assets/art.jpg'),
    serviceName: 'Forest on Canvas',
    businessName: 'Devyn Paints - Art',
    businessId: 'business-3',
    price: '$100',
    location: 'Axis'
  },
  {
    productId: '6',
    image: require('../assets/hats.jpg'),
    serviceName: 'Beanies',
    businessName: 'Phenom Blk Hats',
    businessId: 'business-3',
    price: '$40',
    location: 'Quad'
  }
];

const categories = ['All', 'Clothes', 'Art', 'Jewelry', 'Hats', "Rugs"];

export const MarketplaceScreen = ({
  onCartPress,
  products = defaultProducts
}: MarketplaceScreenProps) => {
  const route = useRoute();
  const params = route.params as { initialCategory?: string } | undefined;
  const initialCategory = params?.initialCategory || 'All';
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    filterProducts(searchQuery, initialCategory);
  }, [initialCategory]);
    
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterProducts(query, selectedCategory);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    filterProducts(searchQuery, category);
  };

  const filterProducts = (query: string, category: string) => {
    let filtered = products;

    // Filter by category
    if (category !== 'All') {
      filtered = filtered.filter(product => 
        product.serviceName.toLowerCase().includes(category.toLowerCase()) ||
        product.businessName.toLowerCase().includes(category.toLowerCase())
      );
    }

    // Filter by search query
    if (query.trim() !== '') {
      filtered = filtered.filter(product =>
        product.serviceName.toLowerCase().includes(query.toLowerCase()) ||
        product.businessName.toLowerCase().includes(query.toLowerCase()) ||
        product.location.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <ProductCard
      productId={item.productId}
      image={item.image}
      serviceName={item.serviceName}
      businessName={item.businessName}
      businessId={item.businessId}
      price={item.price}
      location={item.location}
      onPress={() => {
        navigation.navigate('ProductPage', { productId: item.productId });
      }}
      onBusinessNamePress={() => {
        navigation.navigate('BusinessPage', { businessId: item.businessId });
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
      <Header title="Products" onCartPress={onCartPress} navMenuItems={navMenuItems} />
      
      {/* Search and Categories Section */}
      <View className="bg-white border-b border-gray-100">
        <View className="px-4 py-4">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search for products and services..."
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
      
      {/* Products List */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.productId}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center py-12">
            <Text variant="body" className="text-gray-500 text-center">
              No products found. Try adjusting your search or category filter.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}; 