import { useState } from "react";

const SavedLocationForm = () => { //NOTE props has NOT been declared yet here. Needs our create new / update functions.

    const initialState = {
        name: '',
        streetAddress: '',
        city: '',
        state: '',
    }

    const [formData, setFormData] = useState(initialState); //will later add a ternerary to update this for edit form


    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.targt.value });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log('the Form was submitted') // will add a ternerary to change this to update. also need our props.callbackfunction(formData) for new
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name: </label>
                <input id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required />
                <label htmlFor="streetAddress">Street Address: </label>
                <input id="streetAddress"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleChange}
                    required />
                <label htmlFor="city">City: </label>
                <input id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required />
                <label htmlFor="state">State: </label>
                <input id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required />
                <button type="submit">
                    {/*here will go a ternerary to delineate add vs update */}
                    Add Location
                </button>
            </form>
        </div>
    )
}






export default SavedLocationForm;