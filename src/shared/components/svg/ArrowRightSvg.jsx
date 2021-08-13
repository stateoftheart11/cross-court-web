import React from 'react';
import PropTypes from 'prop-types';

const ArrowRightSvg = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
    <path
      d="m345.44 248.29l-194.29 194.28c-12.359 12.365-32.397 12.365-44.75 0-12.354-12.354-12.354-32.391 0-44.744l171.91-171.91-171.91-171.9c-12.354-12.359-12.354-32.394 0-44.748 12.354-12.359 32.391-12.359 44.75 0l194.29 194.28c6.177 6.18 9.262 14.271 9.262 22.366 0 8.099-3.091 16.196-9.267 22.373"
      transform="matrix(.03541-.00013.00013.03541 2.98 3.02)"
      fill="currentColor"
    />
  </svg>
);

ArrowRightSvg.propTypes = {
  className: PropTypes.string,
};

ArrowRightSvg.defaultProps = {
  className: '',
};

export default ArrowRightSvg;
