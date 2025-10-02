import { Link } from "react-router";

function SavedLocationsList({ savedLocations, handleSelect}) {

  console.log(savedLocations)
  if (!savedLocations.locations) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  const handleClick = (savedLocation)=> {
    handleSelect(savedLocation)
  }

  return (
    <div className="saved-locations">
      <h2>Saved Addresses</h2>
      <ul style={{listStyleType: 'none'}}>
        {savedLocations.locations.map((savedLocation) => (
          <li key={savedLocation._id}>
              <Link to="/" onClick={()=>handleClick(savedLocation)}>{savedLocation.name}</Link>
          </li>
        ))}
      </ul>
      <Link to="/locations/new">Add New</Link>
    </div>
    
  );
}

export default SavedLocationsList;
