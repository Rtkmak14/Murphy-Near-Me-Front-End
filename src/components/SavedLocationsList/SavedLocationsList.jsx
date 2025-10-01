import { Link } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";


function SavedLocationsList({ savedLocations, handleEditSavedLocations, handleDeleteSavedLocations }) {
  const {user} = useContext(UserContext)

  console.log(savedLocations)
  if (!savedLocations.locations) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <div className="saved-locations">
      <h2>Saved Addresses</h2>
      <ul>
        {savedLocations.locations.map((savedLocation) => (
          <li key={savedLocation._id}>
              <Link to={`/users/${user._id}/${savedLocation._id}`}>
                  {savedLocation.name}
              </Link>
          </li>
        ))}
      </ul>
      <Link to="/locations/new">Add New</Link>
    </div>
  );
}

export default SavedLocationsList;
