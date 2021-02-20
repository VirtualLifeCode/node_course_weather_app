const request = require('request')

const forecast = (longitude, latitude, callback) => {

    url = 'http://api.weatherstack.com/current?access_key=a1348f5e026c556904fb7540713ecf9f&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, {body} = {}) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined)
        } else if ( body.error ) {
            callback('Unable to find location, please try another.', undefined)
        } else {
            const forecast = body.current.weather_descriptions[0]
            const temperature = body.current.temperature
            const feelsLike = body.current.feelslike
            const output = forecast + ". It is currently " + temperature + " degrees out, but it feels like " + feelsLike + " degrees."
            callback(undefined, output)
        }
    })
}

module.exports = forecast
