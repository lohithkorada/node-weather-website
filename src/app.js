const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000 // For heroku configuration

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// set up  handlebar location and view engine
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// set up static assets 
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Lohith'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Lohith'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'help message',
        title: 'Help',
        name: 'Lohith'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Address must be provided'
        })
    }
    geoCode(req.query.address, (error, data) => {
        if(!error) {
          forecast(data, (error, { temperature, feelslike, weather_descriptions} = {}) => {
            if(data){
                res.send({
                    forecast: `${weather_descriptions.toString()}. It is currently ${temperature} Fahrenheit out. It feels like ${feelslike} Fahrenheit.`,
                    location: data.location,
                    address: req.query.address
                })
            } else {
                return res.send({
                    error
                })
            }
          })
        } else {
            return res.send({
                error
            })
        }
    });

  
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        errorMessage:'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        errorMessage:'Page not found',
        title: 'Error page',
        name: 'Lohith'
    })
})


app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})