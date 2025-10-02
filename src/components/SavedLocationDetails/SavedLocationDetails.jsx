const SavedLocationDetails = ({ selectedSavedLocation, onBack, handleEdit, handleDelete }) => {

  const { name, streetAddress, city, state, _id } = selectedSavedLocation
    
    console.log(selectedSavedLocation)
  return (
    <div>
      <h2>{name}</h2>
      <p>{streetAddress}</p>
      <p>{city}</p>
      <p>{state}</p>
      <button onClick={() => handleEdit(selectedSavedLocation)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={onBack}>Back to list</button>
    </div>
  )
}

export default SavedLocationDetails

