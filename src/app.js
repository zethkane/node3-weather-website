const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { title } = require('process')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')


const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Zeth Kane'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Zeth Kane'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        body:'Get me me outta here!',
        title:'Help',
        name: 'Zeth Kane'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

     geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error })
            }

            forcast(latitude, longitude, (error, forcastData) => {
                if (error) {
                    return res.send({ error })
                }
                res.send({
                forcast: forcastData,
                location,
                address: req.query.address
            })
            })

            
    })


    // res.send({
    //     forcast: 'It is snowing',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // })
    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'404',
        name: 'Zeth Kane',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title:'404',
        name: 'Zeth Kane',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on prot 3000')
})
