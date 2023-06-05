import React from 'react';
import PropTypes from 'prop-types';

const LockSvg = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.25403 8C4.08573 8.65185 4 9.32379 4 10V12H3V22H21V12H20V10C20 9.32379 19.9143 8.65185 19.746 8C19.6528 7.63912 19.5343 7.2844 19.391 6.93853C18.989 5.96793 18.3997 5.08601 17.6569 4.34315C16.914 3.60028 16.0321 3.011 15.0615 2.60896C14.0909 2.20693 13.0506 2 12 2C10.9494 2 9.90914 2.20693 8.93853 2.60896C7.96793 3.011 7.08601 3.60028 6.34315 4.34315C5.60028 5.08601 5.011 5.96793 4.60896 6.93853C4.4657 7.2844 4.34721 7.63912 4.25403 8ZM17 10C17 9.34339 16.8707 8.69321 16.6194 8.08658C16.3681 7.47995 15.9998 6.92876 15.5355 6.46447C15.0712 6.00017 14.52 5.63188 13.9134 5.3806C13.3068 5.12933 12.6566 5 12 5C11.3434 5 10.6932 5.12933 10.0866 5.3806C9.47995 5.63188 8.92876 6.00017 8.46447 6.46447C8.00017 6.92876 7.63188 7.47996 7.3806 8.08658C7.12933 8.69321 7 9.34339 7 10V12H17V10ZM13 19V15H11V19H13Z"
      fill="currentColor"
    />
  </svg>
);

LockSvg.defaultProps = {
  className: '',
};

LockSvg.propTypes = {
  className: PropTypes.string,
};

export default LockSvg;
