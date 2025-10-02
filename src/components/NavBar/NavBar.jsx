import { useContext } from "react";
import { Link } from 'react-router'

import { UserContext } from '../../contexts/UserContext'

const NavBar = ({setSelectedSavedLocation}) => {
    const { user, setUser } = useContext(UserContext)

    const handleSignOut = () => {
        localStorage.removeItem('token')
        setUser(null)
    }

    return (
        <nav>
            {user ? (
                <ul style={{listStyleType: 'none'}}>
                    <li><Link to='/' onClick={()=> setSelectedSavedLocation(null)}>Home</Link></li>
                    <li><Link to='/' onClick={handleSignOut}>Sign Out</Link></li>
                </ul>
            ) : (
                <ul style={{listStyleType: 'none'}}>
                    <li><Link to='/'>Home</Link></li>
                    <div className="sign-options">
                    <li><Link to='/sign-in'>Sign In</Link></li>
                    <li><Link to='/sign-up'>Sign Up</Link></li>
                    </div>
                </ul>
            )}  <h1 className="logo">Murphy's Near Me</h1>
        </nav>
    )
}

export default NavBar