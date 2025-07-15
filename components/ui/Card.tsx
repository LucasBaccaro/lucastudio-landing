
import * as React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ children, className = '', ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`backdrop-blur-xl bg-white/60 rounded-3xl shadow-2xl p-8 md:p-12 transition-transform duration-300 hover:scale-105 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});
Card.displayName = 'Card';

export default Card;