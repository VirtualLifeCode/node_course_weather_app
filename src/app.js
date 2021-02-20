const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths from Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine for views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Michael Thompson'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather App - About Me',
        name: 'Michael Thompson'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather App Help',
        message: 'If you need help, you are out of luck!',
        name: 'Michael Thompson'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must submit an address to use this app!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {


        if (error) {
            return console.log('Error: ', error)
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return console.log('Error: ', error)
            }
    
            // console.log(location)
            // console.log(forecastData)

            res.send({
                forecast: forecastData,
                location: location 
            })
        })
    })    

    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Are you lost?',
        errorMessage: 'Are you looking for a help article?',
        name: 'Michael Thompson'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Are you lost?',
        errorMessage: 'We could not find the page you are looking for.',
        name: 'Michael Thompson'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port: 3000')
})