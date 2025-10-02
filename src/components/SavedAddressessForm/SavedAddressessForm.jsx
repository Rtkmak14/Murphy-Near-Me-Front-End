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
        lat: 0,
        long: 0,
    }


    const {user} = useContext(UserContext)
    const [formData, setFormData] = useState(
        props.selectedSavedLocation ? props.selectedSavedLocation : initialState //!NEED TO KNOW VARIABLE BEING PASSED IN AS PROPS.
    ); 

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };


    
    const handleSubmit = async (evt) => {
    try {
        evt.preventDefault();
        const geoCoord = await googleMapsService.getGeocode(`${formData.streetAddress}, ${formData.city}, ${formData.state}`)
        if (props.selectedSavedLocation) {
            await locationService.update({...formData, lat: geoCoord.lat, long: geoCoord.lng}, user, props.selectedSavedLocation);
            props.setSelectedSavedLocation(null)
        } else {
            await locationService.create({...formData, lat: geoCoord.lat, long: geoCoord.lng}, user)
        }
            navigate('/');
        } 
            catch (err) {
            console.log(err);
     }
    };



    return (
        <div className="formContainer">
            <form onSubmit={handleSubmit} className="controlledForm">
                <div className="nameField">
                <label htmlFor="name">Name: </label>
                <input id="name"
                className="inputField"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required />
                </div>
                <div className="streetField">
                <label htmlFor="streetAddress">Street Address: </label>
                <input id="streetAddress"
                className="inputField"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleChange}
                    required />
                </div>
                <div className="cityField">
                <label htmlFor="city">City: </label>
                <input id="city"
                className="inputField"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required />
                </div> 
                <div className="stateField">
                <label htmlFor="state">State: </label>
                <input id="state"
                className="inputField"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required />
                </div>
                <button type="submit" className="submitButton">
                    {props.selectedSavedLocation ? 'Update Address' : 'Add Address'}
                </button>
            </form>
        </div>
    );
};






export default SavedLocationForm;









