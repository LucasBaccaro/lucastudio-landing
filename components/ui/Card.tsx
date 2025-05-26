
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-surface rounded-lg border border-borderLight shadow-sm p-6 md:p-8 overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

export default Card;