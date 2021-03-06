// Dependence
const express = require('express')
const app = express()
const cors = require('cors');
const PORT = process.env.PORT || 1964;
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
var runLocal = true;
var enviroment = require('./environment')
// Enable CORS
app.use(cors({
    origin: '*'
}));
// Serve Homepage

// Serve staic file
app.use(express.static('public'));


// App Routing 

// Serve autoComplete for city suggestion in frontend
app.get('/autoComplete', (req,res)=> {
    let keyword = req.query.keyword;
    let urlToAutoComplete = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${keyword}&types=(cities)&language=en&components=country:us&key=${enviroment.googleAutoCompleteApiKey}`
    fetch(urlToAutoComplete)
    .then(res => res.json())
    .then(data => {
        var resultsArray = [];
        for(let i=0; i<data.predictions.length;i++)
        {
            resultsArray.push({
                'description': data.predictions[i].description,
                'name':data.predictions[i].structured_formatting.main_text
            });
        }
        res.send(resultsArray);
    })
    .catch(err => {
        res.send(err);
    });
});
// Serve search for weather
app.get('/search', (req, res) => {
    let latitude = req.query.latitude;
    let longitude = req.query.longitude;
    let type = req.query.type;
    let url_to_tomorrowio = '';
    if( type == "current" )
    {
        url_to_tomorrowio = `https://api.tomorrow.io/v4/timelines?location=${latitude},${longitude}&fields=weatherCode,temperature,humidity,pressureSeaLevel,windSpeed,visibility,cloudCover,uvIndex&timesteps=current&units=imperial&timezone=America/Los_Angeles&apikey=${enviroment.tomorrowioApiKey}`
    }
    else if (type == "daily")
    {
        url_to_tomorrowio = `https://api.tomorrow.io/v4/timelines?location=${latitude},${longitude}&fields=weatherCode,temperatureMax,temperatureMin,precipitationType,precipitationProbability,windSpeed,cloudCover,temperatureApparent,humidity,visibility,sunriseTime,sunsetTime&timesteps=1d&units=imperial&timezone=America/Los_Angeles&apikey=${enviroment.tomorrowioApiKey}`
    }
    else if (type == "hourly")
    {
        url_to_tomorrowio = `https://api.tomorrow.io/v4/timelines?location=${latitude},${longitude}&fields=temperature,humidity,pressureSeaLevel,windSpeed,windDirection&timesteps=1h&units=imperial&timezone=America/Los_Angeles&apikey=${enviroment.tomorrowioApiKey}`
    }
    else
    {
        // return error message
    }
    fetch(url_to_tomorrowio)
    .then(res => res.json())
    .then(data => {
        data["status"] = "200";
        res.send(data);
    })
    .catch(err => {
        res.send(err);
    });
});



//Listen on port
app.listen(PORT, () =>
{
    console.log(`listening at port: ${PORT}`)
})

