import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from 'components/atoms/Text';

type ScreenContentProps = {
  children: React.ReactNode;
  title?: string;
  path?: string;
  className?: string;
  contentContainerClassName?: string;
  showsVerticalScrollIndicator?: boolean;
};

export default function ScreenContent({
  children,
  title,
  path,
  className = '',
  contentContainerClassName = '',
  showsVerticalScrollIndicator = false
}: ScreenContentProps) {
  return (
    <ScrollView
      className={`flex-1 ${className}`}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
    >
      <View className={`px-4 py-6 ${contentContainerClassName}`}>
        {/* Optional Title */}
        {title && (
          <Text variant="heading" className="text-2xl font-bold mb-4 text-gray-900">
            {title}
          </Text>
        )}
        
        {/* Optional Path for Developer Context */}
        {path && (
          <Text variant="caption" className="text-xs text-gray-400 mb-2">
            {path}
          </Text>
        )}
        
        {/* Content */}
        {children}
      </View>
    </ScrollView>
  );
}
