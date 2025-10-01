function SavedAddressList({ addresses, handleEditAddress, handleDeleteAddress }) {
  return (
    <div className="address-list">
      <h2>Saved Addresses</h2>
      <ul>
        {addresses.map((address) => (
          <li key={address._id}>
            <p>
              {address.name}
            </p>
            <div>
              <button onClick={() => handleEditAddress(address)}>Edit</button>
              <button onClick={() => handleDeleteAddress(address._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SavedAddressList;
