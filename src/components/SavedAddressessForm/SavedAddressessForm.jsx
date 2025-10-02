import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import * as locationService from "../../services/locationService"
import { UserContext } from "../../contexts/UserContext";
import * as googleMapsService from "../../services/googleMapsService";



const SavedLocationForm = (props) => { 
    console.log(props.selectedSavedLocation);
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
             const newLocation = await locationService.create({...formData, lat: geoCoord.lat, long: geoCoord.lng}, user)
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
                    {props.selectedSavedLocation ? 'Update Address' : 'Add Address'}
                </button>
            </form>
        </div>
    );
};






export default SavedLocationForm;









