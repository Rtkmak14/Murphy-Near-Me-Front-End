import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router";
import * as locationService from "../../services/locationService";
import SavedLocationsList from "../SavedLocationsList/SavedLocationsList";
import MapComponent from "../MapComponent/MapComponent";



const Landing = (props)=> {

    const {user} = useContext(UserContext)

    const [savedLocations, setSavedLocations] = useState([]);
    const [selectedSavedLocation, setSelectedSavedLocation] = useState(null)
    



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

console.log(savedLocations)

    return (
        <>
            {!user? (<aside>Please login to see your saved addresses!</aside>):
            (<aside>{<SavedLocationsList savedLocations={savedLocations}/>}</aside>)}
            <MapComponent/>
        </>
    )
}

export default Landing