import { useEffect, useState, useContext } from "react";
import { Link } from "react-router";

import { UserContext } from "../../contexts/UserContext";

import * as locationService from "../../services/locationService";

import { Link } from "react-router";
import SavedLocationsList from "../SavedLocationsList/SavedLocationsList";



const Landing = ()=> {

    const {user} = useContext(UserContext)

    const [savedLocations, setSavedLocations] = useState([]);
    const [selectedSavedLocation, setSelectedSavedLocation] = useState(null)
    

    const [searchQuery, setSearchQuery] = useState('');

const handleChange = (evt) => {
    setSearchQuery(evt.target.value);
    console.log(evt.target.value);
};

const handleSubmit = (evt) => {
    evt.preventDefault();
    // console.log('This has been submitted');
};

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
        
            <form onSubmit={handleSubmit}>
                <input type="text"
                placeholder="Search Addresses"
                value={searchQuery}
                onChange={handleChange}/>
                <button>Submit</button>
            </form>
        </>
    )
}

export default Landing