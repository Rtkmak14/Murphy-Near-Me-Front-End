import { APIProvider, Map } from "@vis.gl/react-google-maps"

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const MapComponent = () => {

    return ( 
        <APIProvider apiKey={apiKey} >
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