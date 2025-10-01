import { APIProvider, Map} from "@vis.gl/react-google-maps"
import * as googleMapService from '../../services/googleMapsService'

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const MapComponent = () => {

    const fetchCords = async () => {
        const cords = await googleMapService.getGeocode('5 Crystal Springs Road, Greenville, SC')
        console.log(cords)
    }

    return ( 
        <APIProvider apiKey={apiKey} >
            <button onClick={fetchCords}>get cords</button>
            <Map
                style={{width: '100vw', height: '100vh'}}
                defaultCenter={{lat: 22.54992, lng: 0}}
                defaultZoom={3}
                gestureHandling='greedy'
                disableDefaultUI
            />
        </APIProvider>
    )
}

export default MapComponent