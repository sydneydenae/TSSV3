import React, { useState } from 'react';
import { View, FlatList, StatusBar } from 'react-native';
import { Header } from 'components/organisms/Header';
import { SearchBar } from 'components/molecules/SearchBar';
import { CategoryTabs } from 'components/molecules/CategoryTabs';
import { ProductCard } from 'components/molecules/ProductCard';
import { Text } from 'components/atoms/Text';

interface Product {
  id: string;
  image: any;
  serviceName: string;
  businessName: string;
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
    id: '1',
    image: require('../assets/product1.png'),
    serviceName: 'Math Tutoring',
    businessName: 'Academic Excellence Center',
    price: '$25/hour',
    location: 'Downtown'
  },
  {
    id: '2',
    image: require('../assets/product2.png'),
    serviceName: 'Science Lab Equipment',
    businessName: 'STEM Supplies Co.',
    price: '$150',
    location: 'University District'
  },
  {
    id: '3',
    image: require('../assets/product3.png'),
    serviceName: 'English Literature Books',
    businessName: 'Campus Bookstore',
    price: '$45',
    location: 'Campus Center'
  },
  {
    id: '4',
    image: require('../assets/product4.png'),
    serviceName: 'Laptop Repair',
    businessName: 'Tech Solutions',
    price: '$75',
    location: 'Tech Hub'
  }
];

const categories = ['All', 'Books', 'Tutoring', 'Electronics', 'Services'];

export const MarketplaceScreen = ({
  onCartPress,
  onProductPress,
  products = defaultProducts
}: MarketplaceScreenProps) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

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
      image={item.image}
      serviceName={item.serviceName}
      businessName={item.businessName}
      price={item.price}
      location={item.location}
      onPress={() => onProductPress?.(item)}
      className="mb-4"
    />
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
      {/* Fixed Header */}
      <Header onCartPress={onCartPress} />
      
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
        keyExtractor={(item) => item.id}
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
    </View>
  );
}; 