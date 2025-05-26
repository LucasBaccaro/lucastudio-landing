import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ease-in-out inline-flex items-center justify-center';
  
  let variantStyles = '';
  let finalSizeStyles = '';

  // Determine base text size, horizontal padding, and default vertical padding
  let textSizeClass = '';
  let pxClass = '';
  let pyClassDefault = ''; // Default vertical padding for primary/secondary

  switch (size) {
    case 'sm':
      textSizeClass = 'text-sm';
      pxClass = 'px-4';
      pyClassDefault = 'py-2'; // 8px
      break;
    case 'md':
      textSizeClass = 'text-base';
      pxClass = 'px-6';
      pyClassDefault = 'py-2.5'; // 10px
      break;
    case 'lg':
      textSizeClass = 'text-lg';
      pxClass = 'px-8';
      pyClassDefault = 'py-3'; // 12px
      break;
  }

  switch (variant) {
    case 'primary':
      variantStyles = 'bg-brandBlack text-surface hover:bg-opacity-80 focus:ring-brandBlack';
      finalSizeStyles = `${pxClass} ${pyClassDefault} ${textSizeClass}`;
      break;
    case 'secondary':
      variantStyles = 'bg-accentOne text-surface hover:bg-opacity-80 focus:ring-accentOne';
      finalSizeStyles = `${pxClass} ${pyClassDefault} ${textSizeClass}`;
      break;
    case 'outline':
      variantStyles = 'bg-transparent border-2 border-brandBlack text-brandBlack hover:bg-brandBlack hover:text-surface focus:ring-brandBlack';
      // Adjust pyClass for outline to make overall height match primary/secondary
      // The border is 2px, so we subtract 2px from each side's padding effectively.
      // py-2 (8px) becomes py-1.5 (6px for padding, 6+2=8)
      // py-2.5 (10px) becomes py-2 (8px for padding, 8+2=10)
      // py-3 (12px) becomes py-2.5 (10px for padding, 10+2=12)
      let adjustedPyClass = pyClassDefault;
      if (size === 'sm') adjustedPyClass = 'py-1.5'; // For 0.5rem (py-2) default, becomes 0.375rem (py-1.5)
      if (size === 'md') adjustedPyClass = 'py-2';   // For 0.625rem (py-2.5) default, becomes 0.5rem (py-2)
      if (size === 'lg') adjustedPyClass = 'py-2.5'; // For 0.75rem (py-3) default, becomes 0.625rem (py-2.5)
      finalSizeStyles = `${pxClass} ${adjustedPyClass} ${textSizeClass}`;
      break;
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${finalSizeStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;