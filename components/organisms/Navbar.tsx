import React from 'react';
import { View } from 'react-native';
import { Text } from 'components/atoms/Text';
import { NavItem } from 'components/atoms/NavItem';

interface Route {
  label: string;
  onPress: () => void;
  active: boolean;
  icon?: React.ReactNode;
}

interface NavbarProps {
  routes: Route[];
  title: string;
}

export const Navbar = ({ routes, title }: NavbarProps) => {
  return (
    <View className="flex-row justify-between items-center px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
      {/* Title Section */}
      <View className="flex-1">
        <Text variant="title" className="text-gray-900">
          {title}
        </Text>
      </View>
      
      {/* Navigation Items */}
      <View className="flex-row items-center space-x-2">
        {routes.map((route, index) => (
          <NavItem
            key={`${route.label}-${index}`}
            label={route.label}
            onPress={route.onPress}
            active={route.active}
            icon={route.icon}
          />
        ))}
      </View>
    </View>
  );
};
