import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router";
import * as locationService from "../../services/locationService";
import SavedLocationsList from "../SavedLocationsList/SavedLocationsList";
import MapComponent from "../MapComponent/MapComponent";
import SavedLocationDetails from "../SavedLocationDetails/SavedLocationDetails"


const Landing = ({handleEdit})=> {

  const startCoords = {
        lat: 33.9299471,
        long: -80.36899729999999
    }

    const {user} = useContext(UserContext)

    const [savedLocations, setSavedLocations] = useState([]);
    const [selectedSavedLocation, setSelectedSavedLocation] = useState(null)
    const [coords, setCoords] = useState( startCoords )

    const handleUpdateCoords = (newCoords) => {
      setCoords(newCoords)
    }

    const handleSelect = (location) => {
      setSelectedSavedLocation(location)
      setCoords(location)
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
  
  fetchSavedLocations();
},[user]);

console.log(selectedSavedLocation)

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