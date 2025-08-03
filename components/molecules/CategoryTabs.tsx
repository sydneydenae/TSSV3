import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'components/atoms/Text';

interface CategoryTabsProps {
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  className?: string;
}

export const CategoryTabs = ({
  categories,
  selectedCategory,
  onCategorySelect,
  className = ''
}: CategoryTabsProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className={`py-4 ${className}`}
      contentContainerStyle={{ paddingHorizontal: 16 }}
    >
      {categories.map((category, index) => {
        const isSelected = category === selectedCategory;
        
        return (
          <TouchableOpacity
            key={category}
            onPress={() => onCategorySelect(category)}
            activeOpacity={0.7}
            className={`
              px-6 py-3 mr-3 rounded-full
              ${isSelected 
                ? 'bg-blue-500 border-b-2 border-blue-600' 
                : 'bg-gray-100 border-b-2 border-transparent'
              }
            `}
          >
            <Text
              variant="body"
              className={`
                font-medium text-center
                ${isSelected ? 'text-white' : 'text-gray-700'}
              `}
            >
              {category}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}; 