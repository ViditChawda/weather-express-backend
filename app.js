const request = require('request')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')
const express = require('express')

// const url = "http://api.weatherstack.com/current?access_key=49f954dc1de7224badffdb2a37ed4382&query=37.8267,-122.4233&units=f"

// request({ url: url, json: true }, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to weather service!');
//     } else if (response.body.error) {
//         console.log('Unable to find loaction')
//     } else {
//         console.log("It is currently " + response.body.current.temperature + " degree out. " + response.body.current.precip + "% chances of rain");
//     }
// })

// Geocoding

// API_KEY : pk.eyJ1IjoidmlkaGFuc2h1IiwiYSI6ImNsMmo2MHA5ajAwaTczanFwbTF5aWxmaGEifQ.5FjxWz_zpG1iLNaYlrjcfw
// URL : https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoidmlkaGFuc2h1IiwiYSI6ImNsMmo2MHA5ajAwaTczanFwbTF5aWxmaGEifQ.5FjxWz_zpG1iLNaYlrjcfw

// const geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoidmlkaGFuc2h1IiwiYSI6ImNsMmo2MHA5ajAwaTczanFwbTF5aWxmaGEifQ.5FjxWz_zpG1iLNaYlrjcfw"

// request({ url: geocodeURL, json: true }, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to the service')
//     } else if (response.body.error) {
//         console.log('Unable to find location')
//     } else {
//         const latitude = response.body.features[0].center[0];
//         const longitude = response.body.features[0].center[1];
//         console.log("the latitue : " + latitude + " longitude : " + longitude + "");
//     }

// })

const app = express()

const address = process.argv[2]

app.get('', (req, res) => {
    res.send("Vidit")
})


app.get('/weather', (req, res) => {

    const address = req.query.address;

    if (!req.query.address) {
        return res.send({
            error: 'Please provide the address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        console.log('Entered geocode funtion')

        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            console.log('Entered forecast funtion')
            if (error) {
                return res.send({ error })
            }
            res.send({
                location: location,
                forecast: forecastData,
                address: address
            })
        })
    })
})



app.listen(3001, () => {
    console.log("App running on 3001 PORT")
})