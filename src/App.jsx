import { Routes, Route } from "react-router";
import "./App.css"
import { useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from './components/signInForm/signInForm'
import Landing from './components/Landing/Landing'
import LocationForm from "./components/SavedAddressessForm/SavedAddressessForm";
import MapComponent from "./components/MapComponent/MapComponent";
import { useNavigate } from "react-router";


const App = () => {

const navigate = useNavigate();//added
const [selectedSavedLocation, setselectedSavedLocation] = useState(null)

const handleEdit = (location)=> {
   setselectedSavedLocation(location)
   navigate('/locations/new') //added passed to route locations/new
}

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing handleEdit={handleEdit}/>}/> {/* confirm if this needs to be conditional*/ }
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
        <Route path='/locations/new' element={<LocationForm selectedSavedLocation={selectedSavedLocation} />}/>
      </Routes>
    </>
  )
};

export default App;
