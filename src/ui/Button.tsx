import React from 'react';
import classNames from 'classnames';

interface ButtonProps {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function Button({
  children,
  size = 'medium',
  className,
}: ButtonProps) {
  const sizeClasses = {
    small: 'py-1 px-2 text-sm',
    medium: 'py-2 px-3 text-base',
    large: 'py-3 px-4 text-lg',
  };

  const buttonClassNames = classNames(
    'bg-indigo-600 rounded-lg text-gray-100',
    sizeClasses[size],
    className
  );

  return <button className={buttonClassNames}>{children}</button>;
}
