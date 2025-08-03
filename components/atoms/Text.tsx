import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

type TextVariant = 'body' | 'heading' | 'caption' | 'title' | 'subtitle';

interface TextProps extends Omit<RNTextProps, 'children'> {
  children: React.ReactNode;
  variant?: TextVariant;
  className?: string;
}

const getVariantClasses = (variant: TextVariant): string => {
  switch (variant) {
    case 'heading':
      return 'text-2xl font-bold text-gray-900';
    case 'title':
      return 'text-xl font-semibold text-gray-800';
    case 'subtitle':
      return 'text-lg font-medium text-gray-700';
    case 'body':
      return 'text-base text-gray-600';
    case 'caption':
      return 'text-sm text-gray-500';
    default:
      return 'text-base text-gray-600';
  }
};

export const Text = ({ 
  children, 
  variant = 'body', 
  className = '', 
  ...props 
}: TextProps) => {
  const variantClasses = getVariantClasses(variant);
  const textClasses = `${variantClasses} ${className}`;

  return (
    <RNText className={textClasses} {...props}>
      {children}
    </RNText>
  );
};
