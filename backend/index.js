// Dependence
const express = require('express')
const app = express()
const cors = require('cors');
const PORT = process.env.PORT || 1964;
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
var runLocal = true;

// Enable CORS
app.use(cors({
    origin: '*'
}));
// App Routing 
// Serve search for weather
app.get('/search', (req, res) => {
    let latitude = req.query.latitude;
    let longitude = req.query.longitude;
    let type = req.query.type;
    let url_to_tomorrowio = '';
    if( type == "current" )
    {
        url_to_tomorrowio = `https://api.tomorrow.io/v4/timelines?location=${latitude},${longitude}&fields=weatherCode,temperature,humidity,pressureSeaLevel,windSpeed,visibility,cloudCover,uvIndex&timesteps=current&units=imperial&timezone=America/Los_Angeles&apikey=ZdwyJ8FAyqyCIJgQijJoauA2IQZWlcw5`
    }
    else if (type == "daily")
    {
        url_to_tomorrowio = `https://api.tomorrow.io/v4/timelines?location=${latitude},${longitude}&fields=weatherCode,temperatureMax,temperatureMin,precipitationType,precipitationProbability,windSpeed,humidity,visibility,sunriseTime,sunsetTime&timesteps=1d&units=imperial&timezone=America/Los_Angeles&apikey=ZdwyJ8FAyqyCIJgQijJoauA2IQZWlcw5`
    }
    else if (type == "hourly")
    {
        url_to_tomorrowio = `https://api.tomorrow.io/v4/timelines?location=${latitude},${longitude}&fields=temperature,humidity,pressureSeaLevel,windSpeed,windDirection&timesteps=1h&units=imperial&timezone=America/Los_Angeles&apikey=ZdwyJ8FAyqyCIJgQijJoauA2IQZWlcw5`
    }
    else
    {
        // return error message
    }
    fetch(url_to_tomorrowio)
    .then(res => res.json())
    .then(data => {
        res.send({ data });
    })
    .catch(err => {
        res.send(err);
    });
})

// Serve Homepage
app.get('/', function(req, res)
{
    res.sendFile("index.html", { root: __dirname + "/public"});
});
// Serve staic file
app.use(express.static('public'));

//Listen on port
app.listen(PORT, () =>
{
    console.log(`listening at port: ${PORT}`)
})

