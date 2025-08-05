import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { Logo } from 'components/atoms/Logo';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../type';
import { useNavigation } from '@react-navigation/native';




interface HeaderProps {
  title?: string;
  navMenuItems?: {label: string; onPress: ()=> void }[];
  onCartPress?: () => void;
  className?: string;
}

export const Header = ({ 
  title = "The ScholarShop",
  navMenuItems = [],
  onCartPress, 
  className = '' 
}: HeaderProps) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => setMenuVisible(!menuVisible);
  const closeMenu = () => setMenuVisible(false);
  return (
    <View className={`relative flex-row items-center px-6 py-4 bg-white border-b border-gray-200 ${className}`}>
      {/* Left: Logo */}
      <TouchableOpacity onPress={toggleMenu} activeOpacity={0.7} className='flex-1'>
        <Logo 
          source={require('../../assets/logo.png')} 
          size="medium"
        />
      </TouchableOpacity>

      <Modal
        transparent
        visible={menuVisible}
        animationType='fade'
        onRequestClose={closeMenu}
        >
          <TouchableWithoutFeedback onPress={closeMenu}>
          <View className="flex-1 bg-white bg-opacity-30 justify-start items-start">
            <View className="mt-16 ml-4 w-48 bg-white rounded shadow-lg overflow-hidden">
              {navMenuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    item.onPress();
                    closeMenu();
                  }}
                  className="px-4 py-3 border-b border-gray-200"
                >
                  <Text className="text-gray-800 text-base">{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      
      {/* Center: Navigation Items */}
      <View className="absolute left-0 right-0 items-center">
        <Text className="text-lg font-semibold text-gray-800">{title}</Text>
      </View>
      
      {/* Right: Cart Icon */}
      <TouchableOpacity
        onPress={onCartPress}
        activeOpacity={0.7}
        className="p-2"
      >
        <Ionicons
          name="cart-outline"
          size={24}
          color="#374151"
        />
      </TouchableOpacity>
    </View>
  );
}; 