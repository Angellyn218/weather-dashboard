// variables needed:
// current city
var currCity = {
    name: "",
    date: "",
    icon: "",
    temp: "",
    wind: "", 
    humidity: "",
    days: [
        // day 1
        {
            date: "",
            icon: "",
            temp: "",
            wind: "", 
            humidity: ""
        },
        // day 2
        {
            date: "",
            icon: "",
            temp: "",
            wind: "", 
            humidity: ""
        },
        // day 3
        {
            date: "",
            icon: "",
            temp: "",
            wind: "", 
            humidity: ""
        },
        // day 4
        {
            date: "",
            icon: "",
            temp: "",
            wind: "", 
            humidity: ""
        },
        // day 5
        {
            date: "",
            icon: "",
            temp: "",
            wind: "", 
            humidity: ""
        }
    ]
}
// array of cities (objects)
var cities = [];
// elements on html page (search form, city-sect, days-sect)
var cityInputEl = document.getElementById('city-input');
var searchBtnEl = document.getElementById('search-btn');
var buttonSectEl = document.getElementById('button-sect')
var citySectEl = document.getElementById('city-sect');
var daysSectEl = document.getElementById('days-sect');
// link variables (api-key, api link, city)
var APIKey = "f347914f811d823cd34cc8b05f4907bc";

var coord = {
    lat: 0,
    lon: 0
}

// What to do

// fetch weather forcast of city using link use
function getApi(event) {
    event.preventDefault();

    if (cityInputEl.value === "") {
        console.log("No value in text input")
        return;
    }

    currCity.name = cityInputEl.value;
    var city = currCity.name;

    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIKey;

    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            cityInputEl.value = "";
            console.log(data);

            // Title
            var firstTitleEl = citySectEl.querySelector('#city-title');
            var dt_txt = data.list[0].dt_txt.split(' ')[0];
            var dt_txt_arr = dt_txt.split('-');
            var date = dt_txt_arr[1].concat("/", dt_txt_arr[2], "/", dt_txt_arr[0]);
            console.log(date);

            var title =  currCity.name.concat(" (" + date + ")");
            console.log(title);
            firstTitleEl.textContent = title;
            
            // first icon
            currCity.icon = "http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png"
            var firstIconEl = citySectEl.querySelector('.icon');
            firstIconEl.setAttribute("src", currCity.icon)


        })
}

// input data into city sect
// fetch 5 day forcast of city
// input data into days sect

// create button for a city
// city data into array then local storage
// call get Api function after button search button pressed
searchBtnEl.addEventListener('click', getApi);