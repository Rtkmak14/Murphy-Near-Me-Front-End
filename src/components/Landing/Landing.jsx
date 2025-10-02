import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useMap } from "@vis.gl/react-google-maps";
import * as locationService from "../../services/locationService";
import SavedLocationsList from "../SavedLocationsList/SavedLocationsList";
import MapComponent from "../MapComponent/MapComponent";
import SavedLocationDetails from "../SavedLocationDetails/SavedLocationDetails"
import { useNavigate } from "react-router";

const Landing = ({ selectedSavedLocation, setSelectedSavedLocation})=> {

  const map = useMap()

  const startCoords = {
        lat: 34.8484984,
        long: -82.40001579999999
    }

    const navigate = useNavigate()
    const {user} = useContext(UserContext)

    const [savedLocations, setSavedLocations] = useState([]);
    const [coords, setCoords] = useState( startCoords )

    const handleUpdateCoords = (newCoords) => {
      map.panTo({ lat: newCoords.lat, lng: newCoords.long })
      setCoords({ lat: newCoords.lat, long: newCoords.long })
    }

    const handleSelect = (location) => {
      handleUpdateCoords(location)
      setSelectedSavedLocation(location)
    }
    
    const handleEdit = (location) => {
    setSelectedSavedLocation(location);
    navigate('/locations/new');
    }
  

    const handleDelete = async ()=> {
        await locationService.deleteAddress(user,selectedSavedLocation)
        console.log(savedLocations)
        const result = savedLocations.locations.filter((location)=> {
          return location._id !== selectedSavedLocation._id
        })
        setSavedLocations({locations: result})
        setSelectedSavedLocation(null)
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
        <main className="main-content">
            {!user ? (
              <aside>Please login to see your saved addresses!</aside>
            ) : selectedSavedLocation ? (
              <SavedLocationDetails
                selectedSavedLocation={selectedSavedLocation}
                handleDelete={handleDelete}
                onBack={() => setSelectedSavedLocation(null)}
                handleEdit={handleEdit}
              />
            ) : (
              <SavedLocationsList
                savedLocations={savedLocations}
                handleSelect={handleSelect}
              />
            )}
           <MapComponent handleUpdateCoords={handleUpdateCoords} coords={coords} selectedSavedLocation={selectedSavedLocation} />            
        </main>

    )
}

export default Landing