const apiKey = `${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`

const nearbySearch = async (startCords) => {
    const search =  {
        textQuery: 'Murphy USA',
        locationBias: {
            circle: {
                center: {
                    latitude: startCords.lat,
                    longitude: startCords.long
                },
            radius: 500.0
            }
        }
    }
    const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Goog-FieldMask': 'places.id,places.location,places.shortFormattedAddress',
            'X-Goog-Api-Key': apiKey
        },
        body: JSON.stringify(search)
    })

    const data = await res.json()
    return data.places
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