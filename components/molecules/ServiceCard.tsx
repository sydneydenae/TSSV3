import React, { useState, useRef } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ImageSourcePropType,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
} from 'react-native';
import { Text } from 'components/atoms/Text';
import { Ionicons } from '@expo/vector-icons';

interface ImageWithPrice {
  image: ImageSourcePropType;
  price: string;
}

interface ServiceCardProps {
  businessName: string;
  businessType: string;
  businessLocation: string;
  images: ImageWithPrice[];
  onPress?: () => void;
  className?: string;
}

const windowWidth = Dimensions.get('window').width;

export const ServiceCard = ({
  businessName,
  businessType,
  businessLocation,
  images,
  onPress,
  className = '',
}: ServiceCardProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / windowWidth);
    setCurrentIndex(index);
  };

  const renderImage = ({ item }: { item: ImageWithPrice }) => (
    <Image
      source={item.image}
      className="w-full h-48 rounded-t-lg"
      resizeMode="cover"
      style={{ width: windowWidth - 32 }} // padding adjustment
    />
  );

  return (
    <View
      className={`bg-white rounded-lg shadow-sm border border-gray-100 ${className}`}
    >
      {/* Image slider */}
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderImage}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        className="rounded-t-lg"
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />

      {/* Pagination dots */}
      <View className="flex-row justify-center mt-2 mb-1">
        {images.map((_, index) => (
          <View
            key={index}
            className={`mx-1 rounded-full h-2 w-2 ${
              index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </View>

      {/* Touchable area for the rest of the card */}
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        className="px-4 pb-4"
      >
        {/* Business Name */}
        <Text variant="title" className="font-bold text-gray-900 mb-1">
          {businessName}
        </Text>

        {/* Business Type */}
        <Text variant="body" className="text-gray-600 mb-1">
          {businessType}
        </Text>

        {/* Location */}
        <View className="flex-row items-center mb-2">
          <Ionicons
            name="location-outline"
            size={16}
            color="#6B7280"
            style={{ marginRight: 4 }}
          />
          <Text variant="caption" className="text-gray-500">
            {businessLocation}
          </Text>
        </View>

        {/* Dynamic Price */}
        <Text variant="title" className="font-bold text-blue-600">
          {images[currentIndex]?.price}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
