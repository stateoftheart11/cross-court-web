/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { ProGallery } from 'pro-gallery';
import 'pro-gallery/dist/statics/main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faDownload } from '@fortawesome/free-solid-svg-icons';

import ccLogo from 'shared/images/logos/cc-white.png';
import Fancybox from './Fancybox';

const Gallery = ({ images, hoverEnable, className }) => {
  const containerRef = useRef(null);
  const [container, setContainer] = useState({ width: window.innerWidth });

  images = images.map((image) => ({
    itemId: image.id.toString(),
    mediaUrl: image.src,
    metaData: {
      type: 'image',
      title: `gallery-${image.id}`,
    },
  }));

  const options = {
    galleryLayout: -1,
    imageMargin: 5,
    overlayBackground: '#9999ff80',
    hoveringBehaviour: hoverEnable ? 'APPEARS' : 'NEVER_SHOW',
  };

  const scrollingElement = window;

  const toDataURL = (url) =>
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => URL.createObjectURL(blob));

  const downloadImage = async (url) => {
    const filename = url.substring(url.lastIndexOf('/') + 1);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = await toDataURL(url);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  useEffect(() => {
    setContainer({ width: containerRef.current.offsetWidth });
  }, []);

  return (
    <div ref={containerRef} className={className}>
      <Fancybox options={{ infinite: false }}>
        <ProGallery
          items={images}
          options={options}
          container={container}
          scrollingElement={scrollingElement}
          customImageRenderer={(imageProps) => (
            <img
              {...imageProps}
              alt={imageProps.alt}
              data-fancybox="gallery"
              data-src={imageProps.src}
            />
          )}
          customHoverRenderer={(itemProps) => (
            <div className="flex-col w-full h-full justify-center items-center hidden md:flex">
              <img alt="cc-logo" className="w-12 mb-12" src={ccLogo} />
              <div className="flex justify-center items-center">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="relative text-3xl text-white mr-8 cursor-pointer"
                  data-fancybox-trigger="gallery"
                  data-fancybox-index={itemProps.idx}
                />
                <FontAwesomeIcon
                  icon={faDownload}
                  className="text-3xl text-white cursor-pointer"
                  onClick={() => downloadImage(itemProps.url)}
                />
              </div>
            </div>
          )}
        />
      </Fancybox>
    </div>
  );
};

Gallery.defaultProps = {
  hoverEnable: true,
  className: '',
};

Gallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      src: PropTypes.string.isRequired,
    })
  ).isRequired,
  hoverEnable: PropTypes.bool,
  className: PropTypes.string,
};

export default Gallery;
