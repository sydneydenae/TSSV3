import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
interface Category {
  id: string;
  label: string;
  onPress?: () => void;
}

interface CategoryViewProps {
  categories: Category[];
  numColumns?: number;
  onCartPress?: () => void;
  onCategoryPress?: (category: Category) => void;
}


export const CategoryView = ({ categories, numColumns = 2 }: CategoryViewProps) => {
  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity
      onPress={item.onPress}
      activeOpacity={0.7}
      style={{
        flex: 1,
        margin: 8,
        padding: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 120,
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: '600', color: '#333' }}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={categories}
      renderItem={renderCategory}
      keyExtractor={item => item.id}
      numColumns={numColumns}
      contentContainerStyle={{ paddingHorizontal: 12 }}
      showsVerticalScrollIndicator={false}
    />
  );
};
