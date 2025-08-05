import React, { useEffect, useState } from 'react';
import { View, FlatList, StatusBar, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { BusinessInfo } from 'components/molecules/BusinessInfo';
import { ProductCard } from 'components/molecules/ProductCard';
import { Text } from 'components/atoms/Text';
import { DetailHeader } from 'components/organisms/DetailHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductPage from './ProductPage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../type';

interface Product {
  productId: string;
  image: any;
  serviceName: string;
  businessName: string;
  businessId: string;
  price: string;
  location: string;
}

interface Business {
  id: string;
  name: string;
  location: string;
  type: string;
  description: string;
}

type BusinessPageRouteProp = RouteProp<{
  BusinessPage: { businessId: string };
}, 'BusinessPage'>;

export default function BusinessPage() {
  const route = useRoute<BusinessPageRouteProp>();
  type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'BusinessPage'>;
  const navigation = useNavigation<NavigationProp>();
  const { businessId } = route.params;
  
  const [business, setBusiness] = useState<Business | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const handleBack = () => {
    navigation.goBack();
  };
  // Mock data - in a real app, this would come from an API
  const mockBusinesses: Business[] = [
    {
      id: 'business-1',
      name: 'High Roller Club',
      location: 'Towers',
      type: 'Clothes',
      description: 'An up and coming Streetwear brand.'
    },
    {
      id: 'business-2',
      name: 'Jays Jewelry',
      location: 'Campus Center',
      type: 'Jewelry',
      description: 'Your one-stop shop for all jewlery at the highest quality.'
    },
    {
      id: 'business-3',
      name: 'Elles Rugs',
      location: 'Towers',
      type: 'Rugs',
      description: 'Custom made rugs. Designs can be anything!'
    },
    {
      id: 'business-4',
      name: 'Devyn Paints',
      location: 'Axis',
      type: 'Art',
      description: 'Amatuer artist. I Primaliry work on canvas with acrylics!'
    },
    {
      id: 'business-5',
      name: 'Phenom Blk',
      location: 'Quag',
      type: 'Hats',
      description: 'Up and coming streetwear clothing brand specializing in beanies and hats.'
    }
  ];

  const mockProducts: Product[] = [
    {
      productId: '1',
      image: require('../assets/product1.png'),
      serviceName: 'Math Tutoring',
      businessName: 'Academic Excellence Center',
      businessId: 'business-1',
      price: '$25/hour',
      location: 'Downtown'
    },
    {
      productId: '2',
      image: require('../assets/product2.png'),
      serviceName: 'Science Lab Equipment',
      businessName: 'STEM Supplies Co.',
      businessId: 'business-2',
      price: '$150',
      location: 'University District'
    },
    {
      productId: '3',
      image: require('../assets/product3.png'),
      serviceName: 'English Literature Books',
      businessName: 'Campus Bookstore',
      businessId: 'business-3',
      price: '$45',
      location: 'Campus Center'
    },
    {
      productId: '4',
      image: require('../assets/product4.png'),
      serviceName: 'Laptop Repair',
      businessName: 'Tech Solutions',
      businessId: 'business-4',
      price: '$75',
      location: 'Tech Hub'
    }
  ];

  useEffect(() => {
    // Simulate API call to fetch business and products data
    const fetchBusinessData = async () => {
      setLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Find business by ID
      const foundBusiness = mockBusinesses.find(b => b.id === businessId);
      if (foundBusiness) {
        setBusiness(foundBusiness);
        
        // Filter products for this business
        const businessProducts = mockProducts.filter(p => p.businessId === businessId);
        setProducts(businessProducts);
      }
      
      setLoading(false);
    };

    fetchBusinessData();
  }, [businessId]);

  const renderProduct = ({ item }: { item: Product }) => (
    <View className="w-[48%] mb-4">
      <ProductCard
        productId={item.productId}
        image={item.image}
        serviceName={item.serviceName}
        businessName={item.businessName}
        businessId={item.businessId}
        price={item.price}
        location={item.location}
        onPress={() => {
          console.log('Product pressed:', item.serviceName);
        }}
      />
    </View>
  );

  if (loading) {
    return (
      <View className="flex-1 bg-gray-50 justify-center items-center">
        <Text variant="body" className="text-gray-500">
          Loading business details...
        </Text>
      </View>
    );
  }

  if (!business) {
    return (
      <View className="flex-1 bg-gray-50 justify-center items-center">
        <Text variant="body" className="text-gray-500">
          Business not found.
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
    <View className="flex-1 bg-gray-50">
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
      {/* Detail Header */}
      <DetailHeader
        title={business.name}
        onBackPress={handleBack}
        onCartPress={() => console.log('Cart pressed')}
      />
      
      {/* Scrollable Content */}
    
          {/* Products Grid */}
          <FlatList
            data={products}
            keyExtractor={(item) => item.productId}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            ListHeaderComponent={() => (
              <View className="px-4 pt-6">
                <BusinessInfo
                    name={business.name}
                    location={business.location}
                    type={business.type}
                    description={business.description}
                />
                <Text className="text-xl font-semibold mb-4 text-gray-900">Products</Text>
              </View>
            )}
            renderItem={renderProduct}
            ListEmptyComponent={
              <View className="flex-1 justify-center items-center py-12">
                <Text variant="body" className="text-gray-500 text-center">
                  No products available from this business.
                </Text>
              </View>
            }
          />
        </View>
        </SafeAreaView>
  );
}