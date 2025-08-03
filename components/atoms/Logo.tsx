import React from 'react';
import { Image, ImageSourcePropType } from 'react-native';

interface LogoProps {
  source: ImageSourcePropType;
  size?: 'small' | 'medium' | 'large' | 'xl';
  className?: string;
}

const getSizeClasses = (size: LogoProps['size']): string => {
  switch (size) {
    case 'small':
      return 'w-8 h-8';
    case 'medium':
      return 'w-12 h-12';
    case 'large':
      return 'w-16 h-16';
    case 'xl':
      return 'w-20 h-20';
    default:
      return 'w-12 h-12';
  }
};

export const Logo = ({ 
  source, 
  size = 'medium', 
  className = '' 
}: LogoProps) => {
  const sizeClasses = getSizeClasses(size);
  const logoClasses = `${sizeClasses} ${className}`;

  return (
    <Image
      source={source}
      className={logoClasses}
      resizeMode="contain"
    />
  );
};
