import { Routes, Route } from "react-router";
import "./App.css"

import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from './components/signInForm/signInForm'
import Landing from './components/Landing/Landing'

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing/>}/> {/* confirm if this needs to be conditional*/ }
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
      </Routes>
    </>
  )
};

export default App;
