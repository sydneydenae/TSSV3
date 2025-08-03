import React from 'react';
import { SafeAreaView } from 'react-native';

interface ContainerProps {
  children: React.ReactNode;
  padding?: string;
  backgroundColor?: string;
  className?: string;
}

export const Container = ({ 
  children, 
  padding = 'm-6', 
  backgroundColor = 'bg-white',
  className = '' 
}: ContainerProps) => {
  const containerClasses = `flex-1 ${padding} ${backgroundColor} ${className}`;
  
  return (
    <SafeAreaView className={containerClasses}>
      {children}
    </SafeAreaView>
  );
};
