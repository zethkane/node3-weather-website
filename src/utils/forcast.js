const request = require('postman-request')

const forcast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c262f587641bafacce1975eb50e1aadf&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=f'

    request({ url: url, json: true}, (error, { body }) => {
        if (error){
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error){
            callback('Unable to find location.')
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.')
        }
    })
}

module.exports = forcast