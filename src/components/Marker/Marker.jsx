import {useState} from 'react';
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef
} from '@vis.gl/react-google-maps';

const Marker = ({ lat, lng, name, shortAddress, website, photos }) => {
  const [infowindowOpen, setInfowindowOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();
  // console.log(name);
  // the ? made this work. (review optional chaining).
  const thumbnail = photos?.filter((photo) => photo.widthPx < 300 && photo.heightPx < 300) || [];
  // console.log('This is the thumnbnail', thumbnail);
  // console.dir(thumbnail[0]?.authorAttributions[0].photoUri);
  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        onClick={() => setInfowindowOpen(true)}
        position={{lat: lat, lng: lng}} 
        title={'display name here.'}
      />
      {infowindowOpen && (
        <InfoWindow
          
          anchor={marker}
          maxWidth={200}
          onCloseClick={() => setInfowindowOpen(false)}>
          <img src={thumbnail[0]?.authorAttributions[0].photoUri} />
          <h3 style={{color : 'black'}}>{name.text}</h3>
          <p style={{color : 'black'}}>{shortAddress}</p>
          <a href={website}>{website}</a>
        </InfoWindow>
      )}
    </>
  );
};

export default Marker