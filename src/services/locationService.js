const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`;


const create = async (formData, user) => {
    try {
        const res = await fetch(`${BASE_URL}/users/${user._id}/saved-locations`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
    };
};



export {
    create,
}
