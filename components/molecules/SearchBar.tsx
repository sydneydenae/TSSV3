import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar = ({
  onSearch,
  placeholder = 'Search products...',
  className = ''
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    onSearch(text);
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <View className={`relative ${className}`}>
      <View className="relative">
        <TextInput
          className="pl-12 pr-12 py-3 bg-gray-100 rounded-full text-gray-900 text-base"
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={handleSearch}
          autoCapitalize="none"
          autoCorrect={false}
        />
        
        {/* Search Icon */}
        <View className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <Ionicons
            name="search"
            size={20}
            color="#6B7280"
          />
        </View>
        
        {/* Clear Button */}
        {searchQuery.length > 0 && (
          <TouchableOpacity
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
            onPress={clearSearch}
            activeOpacity={0.7}
          >
            <Ionicons
              name="close-circle"
              size={20}
              color="#6B7280"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}; 