import React from 'react';
import PropTypes from 'prop-types';

const ArrowDown = ({ className }) => (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="far"
    data-icon="long-arrow-alt-down"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 512"
    className={className}
  >
    <path
      fill="currentColor"
      d="M20.485 372.485l99.029 99.03c4.686 4.686 12.284 4.686 16.971 0l99.029-99.03c7.56-7.56 2.206-20.485-8.485-20.485H156V44c0-6.627-5.373-12-12-12h-32c-6.627 0-12 5.373-12 12v308H28.97c-10.69 0-16.044 12.926-8.485 20.485z"
    ></path>
  </svg>
);

ArrowDown.propTypes = {
  className: PropTypes.string,
};

ArrowDown.defaultProps = {
  className: '',
};

export default ArrowDown;