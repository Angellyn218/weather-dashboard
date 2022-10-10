// variables needed:
// current city
var currCity = {
    name: "",
    icon: "",
    temp: "",
    wind: "", 
    humidity: ""
}
// array of cities (objects)
var cities = [];
// elements on html page (search form, city-sect, days-sect)
var searchBtnEl = document.getElementById('search-btn');
var buttonSectEl = document.getElementById('button-sect')
var citySectEl = document.getElementById('city-sect');
var daysSectEl = document.getElementById('days-sect');
// link variables (api-key, api link, city)
var city = "San Mateo";
var APIKey = "f347914f811d823cd34cc8b05f4907bc";

var coord = {
    lat: 0,
    lon: 0
}

// What to do

// fetch weather forcast of city using link use
function getApi() {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("from city:");
            console.log(data);
            coord.lat = data.coord.lat;
            coord.lon = data.coord.lon;
        })
    
    var latLonURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + coord.lat + "&lon=" + coord.lon + "&appid=" + APIKey;

    fetch(latLonURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("from lat & lon");
            console.log(data);
        })
}

// input data into city sect
// fetch 5 day forcast of city
// input data into days sect

// create button for a city
// city data into array then local storage
// 
getApi();