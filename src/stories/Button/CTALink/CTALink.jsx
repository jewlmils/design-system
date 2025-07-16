import React from 'react';
import PropTypes from 'prop-types';

/** Primary CTA link component for user navigation */
export const CTALink = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className = '',
  children,
  href = '#',
  target,
  ...props
}) => {
  // Base classes
  const baseClasses = 'font-bold rounded-full transition-all duration-300 inline-block text-center';
  
  // Variant classes
  const variantClasses = {
    primary: 'text-white bg-planetary_blue hover:bg-powder_blue',
    secondary: 'text-white bg-gray-600 hover:bg-gray-700',
    outline: 'text-planetary_blue border-2 border-planetary_blue hover:bg-planetary_blue hover:text-white'
  };
  
  // Size classes
  const sizeClasses = {
    small: 'px-3 py-1 text-xs',
    medium: 'px-5 py-2 text-sm',
    large: 'px-7 py-3 text-base'
  };
  
  // Disabled classes
  const disabledClasses = disabled ? 'opacity-25 cursor-not-allowed pointer-events-none' : '';
  
  const linkClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabledClasses,
    className
  ].join(' ');

  return (
    <a
      href={disabled ? undefined : href}
      target={target}
      className={linkClasses}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </a>
  );
};

CTALink.propTypes = {
  /** What variant of link to render */
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  /** How large should the link be? */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** Is the link disabled? */
  disabled: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Link contents */
  children: PropTypes.node.isRequired,
  /** Link destination */
  href: PropTypes.string,
  /** Link target (_blank, _self, etc.) */
  target: PropTypes.string,
  /** Optional click handler */
  onClick: PropTypes.func,
};

export default CTALink;