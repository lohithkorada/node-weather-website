const request = require('request')

const forecast = ({lattitude, longitude} = {}, cb) => {
    const url = `http://api.weatherstack.com/current?access_key=988fc8930f0c96951877ad75b895e080&query=${lattitude},${longitude}&units=f`;
    request({ url, json: true }, (error, response) => {
        if (error) {
            cb('Unable to connect to weather service')
        } else if (response.body.error) {
            cb('Unable to find location')
        } else {
            cb(undefined, response.body.current)
        }
    })
}

module.exports = forecast;