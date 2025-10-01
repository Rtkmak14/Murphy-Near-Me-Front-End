
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;


const create = async (formData, user) => {
    try {
        const res = await fetch(`${BASE_URL}/${user._id}/saved-locations`, {
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


const index = async (user) => {
  try {
    const res = await fetch(`${BASE_URL}/${user._id}/saved-locations`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    return data
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

const deleteAddress = async (user,address) => {
  try {
    const res = await fetch(`${BASE_URL}/${user._id}/saved-locations/${address._id}`, {
      method: 'DELETE',
    });

    return res.json();
  } catch (err) {
    console.log(err);
  }
}



export {
  index, create, deleteAddress,
};

