import { APIProvider, Map} from "@vis.gl/react-google-maps"
import { useEffect, useState } from "react"
import * as googleMapsService from '../../services/googleMapsService'
import Marker from "../Marker/Marker"

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const MapComponent = ({ handleUpdateCoords, coords }) => {

    const [markerData, setMarkerData] = useState(null)   
    
    const [searchQuery, setSearchQuery] = useState('');

const handleChange = (evt) => {
    setSearchQuery(evt.target.value);
};

const handleSubmit = async (evt) => {
    evt.preventDefault();

    const cordData = await googleMapsService.getGeocode(searchQuery)
    handleUpdateCoords({
        lat: cordData.lat,
        long: cordData.lng
    })
    setSearchQuery('')
};

    useEffect(() => {
        const fetchData = async () => {
            const data = await googleMapsService.nearbySearch(coords)
            setMarkerData(data)
            console.log('fetching')
        }
        fetchData()
    }, [coords]
    );

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
                defaultCenter={{lat: coords.lat, lng: coords.long}}
                defaultZoom={10}
                gestureHandling='greedy'
                disableDefaultUI
            />
            <Marker lat={coords.lat} lng={coords.long} />
            {markerData?.map((mark) => (
                <Marker lat={mark.location.latitude} lng={mark.location.longitude} />
            ))}
            
        </APIProvider>
        </>
    )
}

export default MapComponent