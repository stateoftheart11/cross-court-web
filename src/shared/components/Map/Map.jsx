import React from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';

import MapMarker from './MapMarker';
import styles from './styles';

const LA_CENTER = {
  lat: 34.0688791,
  lng: -118.2711009,
};

const getMapBounds = (maps, locations) => {
  const bounds = new maps.LatLngBounds();

  [...locations, LA_CENTER].forEach((location) => {
    bounds.extend(new maps.LatLng(location.lat, location.lng));
  });

  return bounds;
};

// Re-center map when resizing the window
const bindResizeListener = (map, maps, bounds) => {
  maps.event.addDomListenerOnce(map, 'idle', () => {
    maps.event.addDomListener(window, 'resize', () => {
      map.fitBounds(bounds);
    });
  });
};

// Fit map to its bounds after the api is loaded
const apiIsLoaded = (map, maps, locations) => {
  // Get bounds by our places
  const bounds = getMapBounds(maps, locations);

  // Bind the resize listener
  bindResizeListener(map, maps, bounds);

  if (locations.length === 1) {
    map.setCenter({ lat: locations[0].lat, lng: locations[0].lng });
  } else {
    // Fit map to bounds
    map.fitBounds(bounds);
  }
};

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const Map = ({ locations, selectedLocation, setLocationHandler, showLocationInfo }) => (
  <div className="w-full h-full">
    <GoogleMapReact
      bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
      center={{
        lat: LA_CENTER.lat,
        lng: LA_CENTER.lng,
      }}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, locations)}
      defaultZoom={14}
      zoom={14}
      options={{ styles }}
    >
      {locations.map((location) => (
        <MapMarker
          key={location.id}
          lat={location.lat}
          lng={location.lng}
          id={location.id}
          location={location}
          showLocationInfo={showLocationInfo}
          selected={location.id === selectedLocation}
          onClickHandler={() => setLocationHandler(location.id)}
          hoverDistance={100}
        />
      ))}
    </GoogleMapReact>
  </div>
);

Map.defaultProps = {
  setLocationHandler: () => null,
  showLocationInfo: true,
};

Map.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape()),
  selectedLocation: PropTypes.number,
  setLocationHandler: PropTypes.func,
  showLocationInfo: PropTypes.bool,
};

export default Map;
