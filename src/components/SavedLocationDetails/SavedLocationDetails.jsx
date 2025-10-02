import { useNavigate, Link } from "react-router"
import * as locationService from "../../services/locationService"

import { UserContext } from "../../contexts/UserContext"
import { useContext } from "react"


const SavedLocationDetails = ({ selectedSavedLocation, onBack }) => {

  const { name, address, city, state, _id } = selectedSavedLocation

  const {user} = useContext(UserContext)
  const navigate = useNavigate() 

    const handleDelete = ()=> {
        locationService.deleteAddress(user,selectedSavedLocation)
        navigate("/")
    }
    
    console.log(selectedSavedLocation)
  return (
    <div>
      <h2>{name}</h2>
      <p>{address}</p>
      <p>{city}</p>
      <p>{state}</p>
      <Link to="/locations/new">Edit</Link>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={onBack}>Back to list</button>
    </div>
  )
}

export default SavedLocationDetails

