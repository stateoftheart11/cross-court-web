import React from 'react';
import { Carousel as ReactResponsiveCarousel } from 'react-responsive-carousel';
import PropTypes from 'prop-types';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './carousel.css';

const Arrow = ({ prev, prevClickHandler, nextClickHandler, label, className }) => (
  <button
    type="button"
    onClick={prev ? prevClickHandler : nextClickHandler}
    title={label}
    className={`carousel-arrow ${prev ? 'prev' : 'next'} ${className}`}
  />
);

const ImagesCarousel = ({
  imageUrls,
  className,
  imagesClassName,
  arrowsClassName,
  infiniteLoop,
  showArrows,
  showStatus,
  showThumbs,
  autoPlay,
  interval,
  useKeyboardArrows,
  swipeable,
}) => (
  <ReactResponsiveCarousel
    preventMovementUntilSwipeScrollTolerance
    swipeScrollTolerance={80}
    className={className}
    infiniteLoop={infiniteLoop}
    showArrows={showArrows}
    showStatus={showStatus}
    showThumbs={showThumbs}
    autoPlay={autoPlay}
    interval={interval}
    useKeyboardArrows={useKeyboardArrows}
    swipeable={swipeable}
    renderArrowPrev={(clickHandler) => (
      <Arrow prev prevClickHandler={clickHandler} className={arrowsClassName} />
    )}
    renderArrowNext={(clickHandler) => (
      <Arrow nextClickHandler={clickHandler} className={arrowsClassName} />
    )}
  >
    {imageUrls.map((image, index) => (
      <img
        className={imagesClassName}
        src={image}
        alt={`carousel-${index}`}
        key={index}
        loading="lazy"
      />
    ))}
  </ReactResponsiveCarousel>
);

Arrow.propTypes = {
  prev: PropTypes.bool,
  prevClickHandler: PropTypes.func,
  nextClickHandler: PropTypes.func,
  className: PropTypes.string,
  label: PropTypes.string,
};

Arrow.defaultProps = {
  prev: false,
  prevClickHandler: null,
  nextClickHandler: null,
  className: '',
  label: '',
};

ImagesCarousel.defaultProps = {
  imageUrls: [],
  className: '',
  imagesClassName: '',
  arrowsClassName: '',
  infiniteLoop: true,
  showArrows: true,
  showStatus: false,
  showThumbs: false,
  autoPlay: false,
  interval: 3000,
  useKeyboardArrows: false,
  swipeable: true,
};

ImagesCarousel.propTypes = {
  imageUrls: PropTypes.arrayOf(PropTypes.shape()),
  className: PropTypes.string,
  imagesClassName: PropTypes.string,
  arrowsClassName: PropTypes.string,
  infiniteLoop: PropTypes.bool,
  showArrows: PropTypes.bool,
  showStatus: PropTypes.bool,
  showThumbs: PropTypes.bool,
  autoPlay: PropTypes.bool,
  interval: PropTypes.number,
  useKeyboardArrows: PropTypes.bool,
  swipeable: PropTypes.bool,
};

export default ImagesCarousel;
