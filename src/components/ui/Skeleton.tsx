import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'title' | 'avatar' | 'card';
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', variant = 'card' }) => {
  const baseStyles = "animate-pulse bg-gray-200 rounded-md";
  
  const variants = {
    text: "h-4 w-full",
    title: "h-6 w-3/4",
    avatar: "h-10 w-10 rounded-full",
    card: "h-32 w-full",
  };

  return <div className={`${baseStyles} ${variants[variant]} ${className}`} />;
};
