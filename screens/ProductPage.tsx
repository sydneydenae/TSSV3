import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DetailHeader } from 'components/organisms/DetailHeader';
import { Text } from 'components/atoms/Text';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../type';

interface Product {
  id: string;
  image: any;
  serviceName: string;
  businessName: string;
  businessId: string;
  price: string;
  location: string;
  description: string;
}

type ProductPageRouteProp = RouteProp<
  {
    ProductPage: { productId: string };
  },
  'ProductPage'
>;

const mockProducts: Product[] = [
  {
    id: '1',
    image: require('../assets/clothes1.png'),
    serviceName: 'HRC Tees',
    businessName: 'High Roller Club',
    businessId: 'business-1',
    price: '$25',
    location: 'Towers',
    description: "Our newest t-shirt drop! Everything made with 100% cotton."
  },
  {
    id: '2',
    image: require('../assets/clothes2.png'),
    serviceName: 'HRC Sweats',
    businessName: 'High Roller Club',
    businessId: 'business-1',
    price: '$150',
    location: 'University District',
    description: 'New ultra-thick sweats in 2 colorways'
  },
  {
    id: '3',
    image: require('../assets/jewelry.jpg'),
    serviceName: 'Waist Beads',
    businessName: 'Jays Jewelry',
    businessId: 'business-2',
    price: '$10',
    location: 'Campus Center',
    description: 'Custom waist beads in any color!'
  },
  {
    id: '4',
    image: require('../assets/rug.jpg'),
    serviceName: 'Stitch Rug',
    businessName: 'Elles Rugs',
    businessId: 'business-3',
    price: '$75',
    location: 'Towers',
    description: 'Custom made stitch Rug!'
  },
  {
    id: '5',
    image: require('../assets/art.jpg'),
    serviceName: 'Forest on Canvas',
    businessName: 'Devyn Paints',
    businessId: 'business-3',
    price: '$100',
    location: 'Axis',
    description: 'Detailed painting of the forest inspired by Lahoa Park.'
  },
  {
    id: '6',
    image: require('../assets/hats.jpg'),
    serviceName: 'Beanies',
    businessName: 'Phenom Blk',
    businessId: 'business-3',
    price: '$40',
    location: 'Quad',
    description: 'New stylish beanies in multiple colorways!'
  }
];

export default function ProductPage() {
  type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductPage'>;
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ProductPageRouteProp>();
  const { productId } = route.params;


  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const foundProduct = mockProducts.find((p) => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      console.log(`Added to cart: ${product.serviceName}`);
    }
  };

  const handleCheckout = () => {
    if (product) {
      console.log(`Checkout started for: ${product.serviceName}`);
    }
  };

  const handleBack = () => navigation.goBack();
  
  const handleBusinessPress = () => {
    if (product) {
      navigation.navigate('BusinessPage', {
        businessId: product.businessId });
    }
  };

  if (!product) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-gray-50">
        <Text variant="body" className="text-gray-500">
          Product not found.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <DetailHeader
        title={product.serviceName}
        onBackPress={handleBack}
        onCartPress={() => console.log('Cart pressed')}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Product Image */}
        <Image
          source={product.image}
          resizeMode="cover"
          className="w-full h-64"
        />

        {/* Content */}
        <View className="px-6 py-6">
          {/* Product Name */}
          <Text
            variant="title"
            className="text-2xl font-bold text-gray-900 mb-2"
          >
            {product.serviceName}
          </Text>

          {/* Business Name - Clickable */}
          <TouchableOpacity onPress={handleBusinessPress} activeOpacity={0.7}>
            <Text className="text-base text-blue-600 font-medium mb-1">
              {product.businessName}
            </Text>
          </TouchableOpacity>

          {/* Price & Location */}
          <Text className="text-lg font-semibold text-gray-800 mb-1">
            {product.price}
          </Text>
          <Text className="text-sm text-gray-500 mb-4">{product.location}</Text>

          {/* Description */}
          <Text className="text-base text-gray-700 leading-relaxed">
            {product.description}
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View className="px-6 pb-6">
        <TouchableOpacity
          onPress={handleAddToCart}
          className="bg-black rounded-full py-4 mb-3"
        >
          <Text className="text-white text-center font-bold text-base">
            Add to Cart
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleCheckout}
          className="bg-gray-800 rounded-full py-4"
        >
          <Text className="text-white text-center font-bold text-base">
            Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
