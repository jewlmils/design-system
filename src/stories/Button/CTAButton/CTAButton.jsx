import React from 'react';
import PropTypes from 'prop-types';

/** Primary CTA component for user interaction */
export const CTAButton = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className = '',
  children,
  type = 'button',
  ...props
}) => {
  // Base classes
  const baseClasses = 'font-medium rounded-full text-white transition-all duration-300';
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-planetary_blue hover:bg-powder_blue',
    secondary: 'bg-gray-600 hover:bg-gray-700',
  };
  
  // Size classes
  const sizeClasses = {
    small: 'px-3 py-1 text-xs',
    medium: 'px-5 py-2 text-sm',
    large: 'px-7 py-3 text-base'
  };
  
  // Disabled classes
  const disabledClasses = disabled ? 'opacity-25 cursor-not-allowed' : '';
  
  const buttonClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabledClasses,
    className
  ].join(' ');

  return (
    <button
      type={type === 'button' ? 'button' : 'submit'}
      className={buttonClasses}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

CTAButton.propTypes = {
  /** What variant of button to render */
  variant: PropTypes.oneOf(['primary', 'secondary']),
  /** How large should the button be? */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** Is the button disabled? */
  disabled: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Button contents */
  children: PropTypes.node.isRequired,
  /** Button type */
  type: PropTypes.oneOf(['button', 'submit']),
  /** Optional click handler */
  onClick: PropTypes.func,
};

export default CTAButton;