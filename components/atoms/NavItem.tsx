import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from 'components/atoms/Text';

interface NavItemProps {
  label: string;
  onPress: () => void;
  active: boolean;
  icon?: React.ReactNode;
}

export const NavItem = ({ 
  label, 
  onPress, 
  active, 
  icon 
}: NavItemProps) => {
  const containerClasses = `
    flex-row items-center px-4 py-3 rounded-lg mb-2
    ${active 
      ? 'bg-blue-500 shadow-sm' 
      : 'bg-transparent hover:bg-gray-100'
    }
  `;
  
  const textClasses = active 
    ? 'text-white font-medium' 
    : 'text-gray-700 font-normal';

  return (
    <TouchableOpacity
      className={containerClasses}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {icon && (
        <View className="mr-3">
          {icon}
        </View>
      )}
      <Text className={textClasses}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}; 