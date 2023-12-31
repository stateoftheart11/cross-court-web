import React from 'react';
import PropTypes from 'prop-types';

const LinkSvg = ({ className }) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M12.9545 20.3182L15.4091 22.7727L12.9545 25.2273C10.2433 27.9385 10.2433 32.3342 12.9545 35.0454C15.6657 37.7567 20.0615 37.7567 22.7727 35.0454L25.2272 32.5909L27.6818 35.0454L25.2272 37.5C21.1604 41.5668 14.5668 41.5668 10.5 37.5C6.43316 33.4332 6.43316 26.8395 10.5 22.7727L12.9545 20.3182Z"
      fill="currentColor"
    />
    <path
      d="M25.2272 12.9546L22.7727 15.4091L20.3182 12.9546L22.7727 10.5C26.8395 6.43319 33.4331 6.43319 37.5 10.5C41.5668 14.5668 41.5668 21.1604 37.5 25.2273L35.0454 27.6818L32.5909 25.2273L35.0454 22.7727C37.7566 20.0615 37.7566 15.6658 35.0454 12.9546C32.3342 10.2433 27.9385 10.2433 25.2272 12.9546Z"
      fill="currentColor"
    />
    <path
      d="M28.2954 17.25L17.25 28.2954L19.7045 30.75L30.75 19.7045L28.2954 17.25Z"
      fill="currentColor"
    />
  </svg>
);

LinkSvg.defaultProps = {
  className: '',
};

LinkSvg.propTypes = {
  className: PropTypes.string,
};

export default LinkSvg;
