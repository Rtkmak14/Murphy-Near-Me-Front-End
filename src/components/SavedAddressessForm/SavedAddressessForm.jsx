import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import * as locationService from "../../services/locationService"
import { UserContext } from "../../contexts/UserContext";
import * as googleMapsService from "../../services/googleMapsService";



const SavedLocationForm = (props) => { 

    const navigate = useNavigate();
    const initialState = {
        name: '',
        streetAddress: '',
        city: '',
        state: '',
    }


    const {user} = useContext(UserContext)
    const [formData, setFormData] = useState(
        props.selectedSavedLocation ? props.selectedSavedLocation : initialState //!NEED TO KNOW VARIABLE BEING PASSED IN AS PROPS.
    ); 

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = (evt) => {
    try {
        evt.preventDefault();
        console.log('formData:', formData);
        //set long lat api call
        //const geo = googleMapsService.getGeocode(formData)
        //console.log(geo);
        if (props.selectedSavedLocation) {
            locationService.update(formData, user, props.selectedSavedLocation);
        } else {
             const newLocation = locationService.create(formData, user)
             console.log(newLocation);
        }
            navigate('/');
        } 
            catch (err) {
            console.log(err);
     }
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
                    {props.selectedLocation ? 'Update Address' : 'Add Address'}
                </button>
            </form>
        </div>
    );
};






export default SavedLocationForm;









