import { useState, useContext } from "react";

import * as locationService from "../../services/locationService"
import { UserContext } from "../../contexts/UserContext";

const SavedLocationForm = () => { 
    const initialState = {
        name: '',
        streetAddress: '',
        city: '',
        state: '',
    }


    const {user} = useContext(UserContext)
    const [formData, setFormData] = useState(initialState); 


    const handleChange = (evt) => {
        console.log(evt.target.value);
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = (evt) => {
    try {
        evt.preventDefault();
        console.log('formData:', formData);
        //set long lat api call
        const newLocation = locationService.create(formData, user)
        console.log(newLocation);
   
    } catch (err) {
     console.log(err);
     };
    };
    
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









