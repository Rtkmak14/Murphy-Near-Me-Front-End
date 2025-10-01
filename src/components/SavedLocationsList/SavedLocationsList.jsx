function SavedLocationsList({ savedLocations, handleEditSavedLocations, handleDeleteSavedLocations }) {
  return (
    <div className="saved-locations">
      <h2>Saved Addresses</h2>
      <ul>
        {savedLocations.map((savedLocation) => (
          <li key={savedLocation._id}>
            <p>
              {savedLocation.name}
            </p>
            <div>
              <button onClick={() => handleEditSavedLocations(savedLocation)}>Edit</button>
              <button onClick={() => handleDeleteSavedLocations(savedLocation._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SavedLocationsList;
