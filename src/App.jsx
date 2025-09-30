import { Routes, Route } from "react-router";
import "./App.css"

import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from './components/signInForm/signInForm'

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<h1>Hello World!</h1>} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
      </Routes>
    </>
  )
};

export default App;
