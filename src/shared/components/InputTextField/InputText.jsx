import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Label from 'shared/components/Label';

const InputTextContainer = styled.div`
  input {
    padding-left: ${(props) => (props.leftIconWidth ? `${props.leftIconWidth}px` : '')};
    padding-right: ${(props) => (props.rightIconWidth ? `${props.rightIconWidth}px` : '')};
  }
`;

function InputText({
  name,
  label,
  labelColor,
  error,
  hint,
  disabled,
  icon,
  leftIcon,
  rightIcon,
  dark,
  variant,
  className,
  ...props
}) {
  const [leftIconWidth, setLeftIconWidth] = useState(null);
  const [rightIconWidth, setRightIconWidth] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      const leftIconWidth = document.getElementById('left-icon')?.offsetWidth;
      const rightIconWidth = document.getElementById('right-icon')?.offsetWidth;

      if (leftIconWidth) {
        setLeftIconWidth(leftIconWidth + 30);
      }
      if (rightIconWidth) {
        setRightIconWidth(rightIconWidth + 30);
      }
    }, 100);
  }, []);

  const darkClasses = (() => {
    if (dark) {
      return 'text-cream bg-cc-blue-500 border border-cc-blue-500 focus:border-cream/10';
    }

    return 'text-cc-black bg-cream border border-cc-black/50 focus:border-cc-black/100';
  })();

  const inputClasses = (() => {
    switch (variant) {
      case 'shrink':
        return 'px-2 py-1';
      case 'expanded':
        return 'px-4 py-5';
      case 'normal':
      default:
        return 'px-2 py-2 md:py-3';
    }
  })();

  return (
    <div className={className}>
      <InputTextContainer
        className={disabled ? 'opacity-50 pointer-events-none' : ''}
        leftIconWidth={leftIconWidth}
        rightIconWidth={rightIconWidth}
      >
        {label && (
          <Label className="mb-1 uppercase text-sm md:text-base" htmlFor={name} color={labelColor}>
            {label}
          </Label>
        )}
        <div className="relative">
          {leftIcon && (
            <div
              id="left-icon"
              className="absolute transform -translate-y-1/2 top-1/2 left-4 leading-none"
            >
              {icon}
            </div>
          )}
          <input
            className={`w-full font-shapiro45_welter_extd text-opacity-70 focus:text-opacity-100 ${darkClasses} ${inputClasses}`}
            autoComplete="off"
            name={name}
            disabled={disabled}
            {...props}
          />
          {rightIcon && (
            <div
              id="right-icon"
              className="absolute transform -translate-y-1/2 top-1/2 right-4 leading-none"
            >
              {icon}
            </div>
          )}
        </div>
        {hint && (
          <div
            className={`font-shapiro45_welter_extd text-xs text-right mt-2 ${
              error ? 'text-red-500' : 'text-current opacity-70'
            }`}
          >
            {hint}
          </div>
        )}
        {error && !hint && (
          <div className="font-shapiro45_welter_extd text-xs text-right text-red-500 mt-2">
            {error}
          </div>
        )}
      </InputTextContainer>
    </div>
  );
}

InputText.defaultProps = {
  label: null,
  labelColor: null,
  error: null,
  hint: null,
  icon: null,
  disabled: false,
  leftIcon: false,
  rightIcon: false,
  dark: false,
  variant: 'normal',
  className: '',
};

InputText.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  labelColor: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  hint: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.shape(),
  leftIcon: PropTypes.bool,
  rightIcon: PropTypes.bool,
  dark: PropTypes.bool,
  variant: PropTypes.string,
  className: PropTypes.string,
};

export default InputText;
