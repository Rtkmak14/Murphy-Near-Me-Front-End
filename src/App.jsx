import { Routes, Route } from "react-router";
import "./App.css"
import { useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from './components/signInForm/signInForm'
import Landing from './components/Landing/Landing'
import LocationForm from "./components/SavedAddressessForm/SavedAddressessForm";
import MapComponent from "./components/MapComponent/MapComponent";


const App = () => {

const [selectedSavedLocation, setSelectedSavedLocation] = useState(null)

  return (
    <>
      <NavBar setSelectedSavedLocation={selectedSavedLocation}/>
      <Routes>
        <Route path="/" element={<Landing selectedSavedLocation={selectedSavedLocation} setSelectedSavedLocation={setSelectedSavedLocation}/>}/> {/* confirm if this needs to be conditional*/ }
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
        <Route path='/locations/new' element={<LocationForm selectedSavedLocation={selectedSavedLocation} setSelectedSavedLocation={setSelectedSavedLocation}/>}/>
      </Routes>
    </>
  )
};

export default App;
