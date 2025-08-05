import React from 'react';
import { View, FlatList } from 'react-native';
import { Text } from 'components/atoms/Text';
import { ProductCard } from 'components/molecules/ProductCard';

interface Product {
  productId: string;
  image: any;
  serviceName: string;
  businessName: string;
  businessId: string;
  price: string;
  location: string;
}

type ProductsSectionProps = {
  products: Product[];
  title?: string;
  onProductPress?: (product: Product) => void;
};

export const ProductsSection = ({
  products,
  title = 'Products',
  onProductPress
}: ProductsSectionProps) => {
  const renderProduct = ({ item, index }: { item: Product; index: number }) => (
    <View className={`w-[48%] ${index % 2 === 0 ? 'mr-2' : 'ml-2'}`}>
      <ProductCard
        productId={item.productId}
        image={item.image}
        serviceName={item.serviceName}
        businessName={item.businessName}
        businessId={item.businessId}
        price={item.price}
        location={item.location}
        onPress={() => onProductPress?.(item)}
        className="mb-4"
      />
    </View>
  );

  return (
    <View className="px-4 py-6">
      {/* Section Title */}
      <Text variant="title" className="text-xl font-semibold mb-4 text-gray-900">
        {title}
      </Text>
      
      {/* Products Grid */}
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.productId}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center py-12">
            <Text variant="body" className="text-gray-500 text-center">
              No products available at the moment.
            </Text>
          </View>
        }
      />
    </View>
  );
}; 