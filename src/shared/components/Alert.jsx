import React from 'react';
import PropTypes from 'prop-types';

import ExclamationSvg from 'shared/components/svg/ExclamationSvg';

const Alert = ({ variant, align, className, showIcon, children }) => {
  const getVariantClasses = (() => {
    switch (variant) {
      case 'success':
        return 'bg-success text-black';
      case 'warning':
        return 'bg-warning text-black';
      case 'error':
        return 'bg-error-400 text-black';
      case 'notice':
      default:
        return 'bg-white text-black';
    }
  })();

  const getAlignClass = (() => {
    switch (align) {
      case 'left':
        return 'justify-start';
      case 'right':
        return 'justify-end';
      case 'center':
      default:
        return 'justify-center';
    }
  })();

  return (
    <div className={className}>
      <div
        className={`text-sm px-2 sm:px-4 py-3 flex items-center ${getVariantClasses} ${getAlignClass}`}
      >
        {showIcon && <ExclamationSvg className="w-4 shrink-0 -mt-px mr-2" />}
        {children}
      </div>
    </div>
  );
};

Alert.defaultProps = {
  showIcon: true,
  align: 'center',
  className: '',
};

Alert.propTypes = {
  variant: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  showIcon: PropTypes.bool,
  align: PropTypes.string,
  className: PropTypes.string,
};

export default Alert;
