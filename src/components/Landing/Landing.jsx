import { useEffect, useState, useContext } from "react";

import { UserContext } from "../../contexts/UserContext";

import * as userService from "../../services/userService";

const Landing = ()=> {

    const {user} = useContext(UserContext)

    const [addresses, setAddress] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
            const testFetch = async () => {
        const data = await userService.index(user)
        setAddress(data)
    }
    testFetch()
    }, [user])

    console.log('address list:', addresses)
    
const handleChange = (evt) => {
    setSearchQuery(evt.target.value);
    console.log(evt.target.value)
    // onSearch(evt.target.value);
};

const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log('This has been submitted');
}


    return (
        <>
            {!user? (<aside>Please login to see your saved addresses!</aside>):
            (<aside>Welcome {user.username}</aside>)}
        
            <form onSubmit={handleSubmit}>
                <input type="text"
                placeholder="Search Addresses"
                value={searchQuery}
                onChange={handleChange}/>
                <button>Submit</button>
            </form>
        </>
    )
}

export default Landing