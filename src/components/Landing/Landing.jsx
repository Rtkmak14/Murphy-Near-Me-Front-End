import { useEffect, useState, useContext } from "react";
import { Link } from "react-router";

import { UserContext } from "../../contexts/UserContext";

import * as userService from "../../services/locationService";
import * as googleMapsService from '../../services/googleMapsService'

import MapComponent from "../MapComponent/MapComponent";



const Landing = ()=> {

    const {user} = useContext(UserContext)

    const [savedLocations, setSavedLocations] = useState([]);
    const [selectedSavedLocation, setSelectedSavedLocation] = useState(null)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editMode, setEditMode] = useState(false)

    const [searchQuery, setSearchQuery] = useState('');

const handleChange = (evt) => {
    setSearchQuery(evt.target.value);
    console.log(evt.target.value)
};

const handleSubmit = (evt) => {
    evt.preventDefault();
    // console.log('This has been submitted');
}

const handleEditSavedLocation = (savedLocation)=> {
  setIsFormOpen(true)
  setEditMode(true)
  setSelectedSavedLocation(savedLocation)
}

const fetchQuery = async () => {
  const data = await googleMapsService.nearbySearch()
  console.log(data)
}

// useEffect(() => {
//   const fetchSavedLocations = async () => {
//     try {
//       const data = await userService.index(user);
//       setSavedLocations(data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   if(user) fetchSavedLocations();
// }, [user]);
    console.log(savedLocations.locations)
    return (
        <>
            {!user? (<aside>Please login to see your saved addresses!</aside>):
            (<aside>Welcome {user.username}</aside>)}
            <MapComponent />
            <Link to="/locations/new">create address</Link>
            <button onClick={fetchQuery}>get data</button>>
              
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