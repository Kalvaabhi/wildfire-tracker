import { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import LocationMarker from './LocationMarker';
import LocationInfoBox from './LocationInfoBox';

const Map = ({
  eventData,
  center = { lat: 42.3265, lng: -122.8756 },
  zoom = 6,
  selectedDate,
  onChangeDate,
}) => {
  const [locationInfo, setLocationInfo] = useState(null);
  const markers = eventData.slice(0, 100).map(ev => {
    if(ev.categories[0].id===8){
      const coords= ev.geometries[0].coordinates;
      return (
      <LocationMarker
  key={ev.id}
  lat={coords[1]}
  lng={coords[0]}
  onClick={() => setLocationInfo(ev)}
/>

      );
    }
    return null;
  });

  return (
    <div className="map" style={{ height: '100vh', width: '100%' }} onClick={() => setLocationInfo(null)}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIza................"}}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {markers}
      </GoogleMapReact>
      {typeof onChangeDate === 'function' && (
        <div className="date-filter-box">
          <label>Select Date:</label>
          <input
            type="date"
            value={selectedDate || ''}
            onChange={(e) => onChangeDate(e.target.value)}
          />
        </div>
      )}
      {locationInfo && (
        <div className="info-overlay" onClick={() => setLocationInfo(null)}>
          <div onClick={(e) => e.stopPropagation()}>
            <LocationInfoBox info={locationInfo} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
