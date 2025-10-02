import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router";
import * as locationService from "../../services/locationService";
import SavedLocationsList from "../SavedLocationsList/SavedLocationsList";
import MapComponent from "../MapComponent/MapComponent";
import SavedLocationDetails from "../SavedLocationDetails/SavedLocationDetails"
import { useNavigate } from "react-router";


const Landing = ({ selectedSavedLocation, setSelectedSavedLocation})=> {

    const navigate = useNavigate()
    const {user} = useContext(UserContext)

    const [savedLocations, setSavedLocations] = useState([]);
    

    const handleSelect = (location) => {
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
            <MapComponent />
        </>

    )
}

export default Landing