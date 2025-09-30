import { useEffect,useState,useContext } from "react";

import { UserContext } from "../../contexts/UserContext";

import * as userService from "../../services/userService"

const Landing = ()=> {

    const {user} = useContext(UserContext)

    const [addresses,setAddress] = useState([])


    return (
        <>
            {!user? (<aside>Please login to see your saved addresses!</aside>):
            (<aside>Welcome {user.username}</aside>)}
        </>
    )
}

export default Landing