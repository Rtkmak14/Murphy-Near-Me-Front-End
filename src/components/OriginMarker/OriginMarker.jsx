import {useState} from 'react';
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
  Pin
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
      ><Pin background={'#f1f504ff'} glyphColor={'#f4f7f5ff'} borderColor={'#000301ff'}></Pin></AdvancedMarker>
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