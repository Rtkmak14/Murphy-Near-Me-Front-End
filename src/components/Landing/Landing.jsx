import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { APIProvider, useMap } from "@vis.gl/react-google-maps";
import { Link } from "react-router";
import * as locationService from "../../services/locationService";
import SavedLocationsList from "../SavedLocationsList/SavedLocationsList";
import MapComponent from "../MapComponent/MapComponent";
import SavedLocationDetails from "../SavedLocationDetails/SavedLocationDetails"

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const Landing = ({handleEdit})=> {

  const map = useMap()

  const startCoords = {
        lat: 33.9299471,
        long: -80.36899729999999
    }

    const {user} = useContext(UserContext)

    const [savedLocations, setSavedLocations] = useState([]);
    const [selectedSavedLocation, setSelectedSavedLocation] = useState(null)
    const [coords, setCoords] = useState( startCoords )

    const handleUpdateCoords = (newCoords) => {
      map.panTo({ lat: newCoords.lat, lng: newCoords.long })
      setCoords({ lat: newCoords.lat, long: newCoords.long })
    }

    const handleSelect = (location) => {
      handleUpdateCoords(location)
      setCoords({
        lat: location.lat,
        long: location.long
      })
    }
    

useEffect(() => {

  const fetchSavedLocations = async () => {
    try {
      const data = await locationService.index(user);
      setSavedLocations(data);
    } catch (err) {
      console.log(err);
    }
  };
  
  if (user) fetchSavedLocations();
},[user]);

    return (
        <>
            {!user ? (
              <aside>Please login to see your saved addresses!</aside>
            ) : selectedSavedLocation ? (
              <SavedLocationDetails
                selectedSavedLocation={selectedSavedLocation}
                onBack={() => setSelectedSavedLocation(null)}
                handleEdit={handleEdit}
              />
            ) : (
              <SavedLocationsList
                savedLocations={savedLocations}
                handleSelect={handleSelect}
              />
            )}
           <MapComponent handleUpdateCoords={handleUpdateCoords} coords={coords} />            
        </>

    )
}

export default Landing