import {useState} from 'react';
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef
} from '@vis.gl/react-google-maps';

const OriginMarker = ({ lat, lng, selectedSavedLocation }) => {
  const [infowindowOpen, setInfowindowOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        onClick={() => setInfowindowOpen(true)}
        position={{lat: lat, lng: lng}} 
        title={`Current Location`}
      />
      {infowindowOpen && (
        <InfoWindow
          anchor={marker}
          maxWidth={200}
          onCloseClick={() => setInfowindowOpen(false)}>
          {selectedSavedLocation ? selectedSavedLocation.name : 'Current Location' }
        </InfoWindow>
      )}
    </>
  );
};

export default OriginMarker