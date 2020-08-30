const request = require('request')

const geoCode = (address, cb) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibG9oaXRoa29yYWRhIiwiYSI6ImNrZWN0MXY2cDBsenEyd21rM2hpbnN2YjMifQ.zbgFqtJO7cFCae1KEiBBMQ&limit=1`;
    request({ url, json: true }, (error, response) => {
        if (error) {
            cb('Unable to connect to mapbox service')
        } else if (response.body.features.length === 0) {
            cb('Unable to find matching results, please try another search')
        } else {
            cb(undefined, {
                lattitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode;