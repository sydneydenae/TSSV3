import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DetailHeader } from 'components/organisms/DetailHeader';
import { Text } from 'components/atoms/Text';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../type';
import { ServiceCard } from 'components/molecules/ServiceCard';

interface ImageWithPrice {
  image: any;
  price: string;
}

interface Service {
  id: string;
  businessName: string;
  businessType: string;
  businessLocation: string;
  images: ImageWithPrice[];
  businessId: string;
  description: string;
}

type ServicePageRouteProp = RouteProp<
  {
    ServicePage: { serviceId: string };
  },
  'ServicePage'
>;

const mockServices: Service[] = [
    {
      id: '1',
      businessName: 'Elegant Salon',
      businessType: 'Hairstylist',
      businessLocation: 'Quad',
      businessId: 'business-1',
      description: 'Hairstylist with 8 years of experience',
      images: [
        { image: require('../assets/hairstyle-1.jpg'), price: '$150' },
        { image: require('../assets/hairstyle-2.jpg'), price: '$130' },
        { image: require('../assets/hairstyle-3.jpg'), price: '$100' },
  
      ],
    },
    {
      id: '2',
      businessName: 'Barber Shop',
      businessType: 'Barber',
      businessLocation: 'Towers',
      businessId: 'business-2',
      description: 'Barber with 5 years of experience',
      images: [
        { image: require('../assets/barber-1.jpg'), price: '$20' },
        { image: require('../assets/barber-2.jpg'), price: '$20' },
      ],
    },
    {
      id: '3',
      businessName: 'Style & Nails',
      businessType: 'Nail Techs',
      businessLocation: 'CHS',
      businessId: 'business-3',
      description: 'Nail tech with 5 years of experince',
      images: [
        { image: require('../assets/nails-1.jpg'), price: '$80' },
        { image: require('../assets/nails-2.jpg'), price: '$70' },
      ],
    },
    {
      id: '4',
      businessName: 'DJ Wildchild',
      businessType: 'DJ',
      businessLocation: 'Quad',
      businessId: 'business-4',
      description: "DJ with 5 years of experince in large venues",
      images: [
        { image: require('../assets/dj-1.jpg'), price: '$200/hr' },
      ],
    },
    {
      id: '5',
      businessName: 'Pretty Blinks',
      businessType: 'Lashes',
      businessLocation: 'CHN',
      businessId: 'business-5',
      description: "Lash tech with 4 years of experience!",
      images: [
        { image: require('../assets/lashes-1.jpg'), price: '$80' },
        { image: require('../assets/lashes-1.jpg'), price: '$100' },
      ],
    },
  ];
  


export default function ServicePage() {
  type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ServicePage'>;
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ServicePageRouteProp>();
  const { serviceId } = route.params;

  const [service, setService] = useState<Service | null>(null);

  useEffect(() => {
    const foundService = mockServices.find((s) => s.id === serviceId);
    if (foundService) {
      setService(foundService);
    }
  }, [serviceId]);

  const handleBooking = () => {
    Alert.alert('Booked!', 'Your booking was successful.');
  };

  const handleBack = () => navigation.goBack();

  const handleBusinessPress = () => {
    if (service) {
      navigation.navigate('BusinessPage', {
        businessId: service.businessId,
      });
    }
  };

  if (!service) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-gray-50">
        <Text variant="body" className="text-gray-500">
          Service not found.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <DetailHeader
        title={service.businessType}
        onBackPress={handleBack}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <ServiceCard
          businessName={service.businessName}
          businessType={service.businessType}
          businessLocation={service.businessLocation}
          images={service.images}
          onPress={handleBusinessPress}
          className="mb-6"
        />

        <View className="px-6">
          <TouchableOpacity
            onPress={handleBooking}
            className="bg-blue-600 rounded-full py-4 mb-6"
          >
            <Text className="text-white text-center font-bold text-base">
              Book Now
            </Text>
          </TouchableOpacity>

          <Text className="text-base text-gray-700 leading-relaxed">
            {service.description}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
