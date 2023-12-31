import React from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';

import UsFlag from 'shared/images/us-flag.png';
import { formatPhoneNumber } from 'shared/utils/helpers';
import Label from 'shared/components/Label';

const InputPhoneField = ({
  name,
  label,
  labelColor,
  error,
  className,
  dark,
  variant,
  showFlag,
  ...props
}) => {
  const colorClasses = (() => {
    if (dark) {
      return 'text-cream bg-cc-blue-500 border border-cc-blue-500 focus:border-cream/10';
    }

    return 'text-cc-black bg-cc-gray-400 border border border-cc-gray-400 focus:border-cc-gray-600 placeholder:text-gray-400';
  })();

  const variantClasses = (() => {
    switch (variant) {
      case 'shrink':
        return `${showFlag ? 'pl-12 md:pl-16 mr-2' : 'px-2'} px-2 py-1`;
      case 'expanded':
        return `${showFlag ? 'pl-12 md:pl-16 mr-4' : 'px-4'} py-5`;
      case 'normal':
      default:
        return `${showFlag ? 'pl-12 md:pl-16 mr-2' : 'px-2'} py-2 md:py-3`;
    }
  })();

  return (
    <div className={className}>
      <Field name={name}>
        {({ field: { name, value, onChange, onBlur }, form: { errors: formikError } }) => (
          <div className="flex flex-col">
            {label && (
              <Label forInput htmlFor={name} color={labelColor}>
                {label}
              </Label>
            )}
            <div className="relative">
              {showFlag && (
                <img
                  src={UsFlag}
                  alt="us-flag"
                  className="absolute transform -translate-y-1/2 top-1/2 left-4 leading-none h-6 md:h-8"
                />
              )}
              <input
                name={name}
                className={`w-full font-shapiro45_welter_extd text-opacity-70 focus:text-opacity-100 text-sm  ${colorClasses} ${variantClasses}`}
                autoComplete="off"
                onChange={onChange}
                onBlur={onBlur}
                value={formatPhoneNumber(value)}
                type="tel"
                maxLength="17"
                onPaste={(e) => e.preventDefault() && false}
                {...props}
              />
            </div>
            {(error || formikError[name]) && (
              <div className="font-shapiro45_welter_extd text-xs text-right text-red-500 mt-2">
                {error || formikError[name]}
              </div>
            )}
          </div>
        )}
      </Field>
    </div>
  );
};

InputPhoneField.defaultProps = {
  label: null,
  labelColor: null,
  error: null,
  className: '',
  dark: false,
  variant: 'normal',
  showFlag: true,
};

InputPhoneField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  labelColor: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
  dark: PropTypes.bool,
  showFlag: PropTypes.bool,
  variant: PropTypes.oneOf(['normal', 'shrink', 'expanded']),
};

export default InputPhoneField;
