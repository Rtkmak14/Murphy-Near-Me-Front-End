import { APIProvider, Map} from "@vis.gl/react-google-maps"
import { useEffect, useState } from "react"
import * as googleMapsService from '../../services/googleMapsService'
import Marker from "../Marker/Marker"

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const MapComponent = () => {

    const startCords = {
        lat: 33.9299471,
        long: -80.36899729999999
    }

    const [markerData, setMarkerData] = useState(null)   
    
    const [searchQuery, setSearchQuery] = useState('');

const handleChange = (evt) => {
    setSearchQuery(evt.target.value);
    console.log(evt.target.value);
};

const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log('This has been submitted');
};

    useEffect(() => {
        const fetchData = async () => {
        const data = await googleMapsService.nearbySearch(startCords)
        setMarkerData(data)
    }
    fetchData()
    }, []
    );

    console.log(markerData)

    return ( 
        <>
             <form onSubmit={handleSubmit}>
             <input type="text"
                placeholder="Search Addresses"
                value={searchQuery}
                onChange={handleChange}/>
                <button>Submit</button>
            </form>
            
        <APIProvider apiKey={apiKey} >
            <Map
                mapId={'1ff6b69bc633e70ed68a7006'}
                style={{width: '100vw', height: '100vh'}}
                defaultCenter={{lat: startCords.lat, lng: startCords.long}}
                defaultZoom={10}
                gestureHandling='greedy'
                disableDefaultUI
            />
            <Marker lat={startCords.lat} lng={startCords.long} />
            {markerData?.map((mark) => (
                <Marker lat={mark.location.latitude} lng={mark.location.longitude} />
            ))}
            
        </APIProvider>
        </>
    )
}

export default MapComponent