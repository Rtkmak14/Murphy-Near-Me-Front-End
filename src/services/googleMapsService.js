const apiKey = `${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`

const nearbySearch = async (startCords) => {

    try {
    const search =  {
        textQuery: 'Murphy USA',
        includedType: 'gas_station',
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
            'X-Goog-FieldMask': 'places.id,places.location,places.shortFormattedAddress,places.displayName,places.websiteUri,places.photos',
            'X-Goog-Api-Key': apiKey
        },
        body: JSON.stringify(search)
    })

    const data = await res.json()

    if (data.err) {
      throw new Error(data.err);
    }

    return data.places
    } catch (err) {
        console.log(err)
    }
    
}

const getGeocode = async (address) => {
    try {
        address.split(' ').join('+')
        const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`)
        const data = await res.json()

        if (data.err) {
            throw new Error(data.err);
        }

        return data.results[0].geometry.location
    } catch (err) {
        console.log(err)
    }

}

export {
    nearbySearch, getGeocode,
}