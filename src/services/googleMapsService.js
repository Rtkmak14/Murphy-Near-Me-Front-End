// const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;
const apiKey = `${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`

const nearbySearch = async () => {
    const search =  {textQuery: 'Murphy USA'}
    const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Goog-FieldMask': '*',
            'X-Goog-Api-Key': apiKey
        },
        body: JSON.stringify(search)
    })

    const data = await res.json()
    return data
}

const getGeocode = async (address) => {
    address.split(' ').join('+')
    const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`)
    const data = await res.json()
    return data.results[0].geometry.location
}

export {
    nearbySearch, getGeocode,
}