import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn } from '@fortawesome/free-solid-svg-icons';

const ToggleButton = ({ offLabel, onLabel, size, value, onChange, className }) => {
  const getSize = (() => {
    switch (size) {
      case 'sm':
        return 'text-sm';
      case 'lg':
        return 'text-lg';
      case 'xl':
        return 'text-xl';
      case '2xl':
        return 'text-2xl';
      case '4xl':
        return 'text-4xl';
      default:
        return 'text-base';
    }
  })();

  return (
    <div className={className}>
      <div className="inline-block">
        <div className="flex items-center">
          {offLabel && <span className="select-none mr-5">{offLabel}</span>}
          {!value && (
            <FontAwesomeIcon
              icon={faToggleOn}
              className={`${getSize} text-cc-purple text-opacity-60 cursor-pointer`}
              rotation={180}
              onClick={() => onChange(true)}
            />
          )}
          {value && (
            <FontAwesomeIcon
              icon={faToggleOn}
              className={`${getSize} text-cc-purple cursor-pointer`}
              onClick={() => onChange(false)}
            />
          )}
          {onLabel && <span className="select-none ml-5">{onLabel}</span>}
        </div>
      </div>
    </div>
  );
};

ToggleButton.defaultProps = {
  offLabel: null,
  onLabel: null,
  size: null,
  className: null,
};

ToggleButton.propTypes = {
  offLabel: PropTypes.string,
  onLabel: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ToggleButton;
