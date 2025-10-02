import { Map } from "@vis.gl/react-google-maps"
import { useEffect, useState } from "react"
import * as googleMapsService from '../../services/googleMapsService'
import Marker from "../Marker/Marker"
import OriginMarker from "../OriginMarker/OriginMarker"

const MapComponent = ({ handleUpdateCoords, coords, selectedSavedLocation }) => {

    const [markerData, setMarkerData] = useState(null)   
    
    const [searchQuery, setSearchQuery] = useState('');

const handleChange = (evt) => {
    setSearchQuery(evt.target.value);
};

const handleSubmit = async (evt) => {
    try{
        evt.preventDefault();

        const coordData = await googleMapsService.getGeocode(searchQuery)
        handleUpdateCoords({
            lat: coordData.lat,
            long: coordData.lng
        })
        setSearchQuery('')
    } catch (err) {
        console.log(err)
    }

};

    useEffect(() => {
        if (!coords) return
        const fetchData = async () => {
            try {
                const data = await googleMapsService.nearbySearch(coords)
                setMarkerData(data)
            } catch (err) {
                console.log(err)
            }
            
        }

        fetchData()
    }, [coords]
    );

    return ( 
        <div className="map-container">
             <form onSubmit={handleSubmit} className="search-bar">
                <label htmlFor="search">Search: </label>
                <input type="text"
                    id="search"
                    name="search"
                    placeholder="Search Addresses"
                    value={searchQuery}
                    onChange={handleChange}
                />
                <button>Submit</button>
            </form>
            
            <Map
                mapId={'1ff6b69bc633e70ed68a7006'}
                style={{width: '70vw', height: '75vh'}}
                defaultCenter={{lat: coords.lat, lng: coords.long}}
                defaultZoom={10}
                gestureHandling='greedy'
                disableDefaultUI
            />
            <OriginMarker lat={coords.lat} lng={coords.long} selectedSavedLocation={selectedSavedLocation} />
            {markerData?.map((mark) => (
                <Marker lat={mark.location.latitude} 
                lng={mark.location.longitude} 
                name={mark.displayName} 
                shortAddress={mark.shortFormattedAddress} 
                website={mark.websiteUri}
                photos={mark.photos}
                />
            ))}
            
        </div>
    )
}

export default MapComponent