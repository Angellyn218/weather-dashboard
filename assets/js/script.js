// variables needed:
// current city
var currCity = {
    title: "",
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
var currKey = "";
var currDate = "";

// array of cities (objects)
var cities = [];
// elements on html page (search form, city-sect, days-sect)
var cityInputEl = document.getElementById('city-input');
var searchBtnEl = document.getElementById('search-btn');
var buttonSectEl = document.getElementById('button-sect')
var citySectEl = document.getElementById('city-sect');
var daysTitleSectEl = document.getElementById('days-title-sect');
var daysSectEl = document.getElementById('days-sect');
// link variables (api-key, api link, city)
var APIKey = "f347914f811d823cd34cc8b05f4907bc";

var coord = {
    lat: 0,
    lon: 0
}

// What to do

// initialize page by loading cities from local storage
function loadFromStorage() {
    var citiesFromStorage = JSON.parse(localStorage.getItem('cities'));
    if (!citiesFromStorage) {
        return;
    }
    cities = citiesFromStorage;
    console.log(cities);
    for (var i = 0; i < cities.length; i++) {
        var buttonEl = document.createElement('button');
        buttonEl.setAttribute('class', 'btn');
        buttonEl.setAttribute('data-key', cities[i].key);
        buttonEl.textContent = cities[i].key;
        
        buttonSectEl.appendChild(buttonEl);
    }
}

// fetch today's weather 
// input data into city sect
function getApiToday(event) {
    event.preventDefault();

    if (cityInputEl.value === "") {
        console.log("No value in text input")
        return;
    }

    currKey = cityInputEl.value;

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + currKey + "&units=imperial&appid=" + APIKey;

    fetch(queryURL)
        .then(function (response) {
            if (!response.ok) {
                changeVisibility("hidden");
            } else {
                return response.json();
            }
        })
        .then(function (data) {
            cityInputEl.value = "";
            console.log(data);

            // first title
            var firstTitleEl = citySectEl.querySelector('#city-title');
            currDate = new Date(data.dt * 1000).toLocaleDateString("en-US"); 
            console.log(currDate);

            var title =  currKey.concat(" (" + currDate + ") ");
            console.log(title);
            firstTitleEl.textContent = title;
            currCity.title = title;
            
            // first icon
            currCity.icon = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
            var firstIconEl = citySectEl.querySelector('.icon');
            firstIconEl.setAttribute("src", currCity.icon);

            // first temp
            currCity.temp = data.main.temp;
            var firstTempEl = citySectEl.querySelector('.temp');
            firstTempEl.textContent = "Temp: " + currCity.temp + " °F";

            // first 
            currCity.wind = data.wind.speed;
            var firstWindEl = citySectEl.querySelector('.wind');
            firstWindEl.textContent = "Wind: " + currCity.wind + " MPH";

            currCity.humidity = data.main.humidity;
            var firstHumidityEl = citySectEl.querySelector('.humidity');
            firstHumidityEl.textContent = "Humidity: " + currCity.humidity + "%";

            getApiDays();
        })
}


// fetch weather forcast of city using link use
// input data into days sect
function getApiDays() {

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + currKey + "&units=imperial&appid=" + APIKey;

    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            cityInputEl.value = "";
            console.log(data);
            var dates = daysSectEl.querySelectorAll(".dates");
            var icons = daysSectEl.querySelectorAll(".icon");
            var temps = daysSectEl.querySelectorAll(".temp");
            var winds = daysSectEl.querySelectorAll(".wind");
            var humidities = daysSectEl.querySelectorAll(".humidity");

            for (var i = 0; i < 5; i++) {
                var curr = data.list[(i + 1) * 8 - 1];
                // date
                var date = new Date(curr.dt * 1000).toLocaleDateString("en-US");
                currCity.days[i].date = date;
                dates[i].textContent = date;

                // icon
                var icon = "https://openweathermap.org/img/w/" + curr.weather[0].icon + ".png";
                currCity.days[i].icon = icon;
                icons[i].setAttribute("src", icon);

                // temp
                var temp = curr.main.temp;
                currCity.days[i].temp = temp;
                temps[i].textContent = "Temp: " + temp + " °F";

                // wind
                var wind = curr.wind.speed;
                currCity.days[i].wind = wind;
                winds[i].textContent = "Wind: " + wind + " MPH";

                // humidity
                var humidity = curr.main.humidity;
                currCity.days[i].humidity = humidity;
                humidities[i].textContent = "Humidity: " + humidity + "%";

            }
            console.log(currCity);

            changeVisibility("visible");

            createCityButton();
        })
}

// create button for a city
function createCityButton() {
    for (var i = 0; i < cities.length; i++) {
        if(cities[i].key === currKey) {
            storeNewCityData(i);
            return;
        }
    }
    var buttonEl = document.createElement('button');
    buttonEl.setAttribute('class', 'btn');
    buttonEl.setAttribute('data-key', currKey);
    buttonEl.textContent = currKey;
    buttonEl.addEventListener('click',setCityData);
    
    buttonSectEl.appendChild(buttonEl);

    storeCity();
}

// city data into array then local storage
function storeCity() {
    var city = {};
    city.key = JSON.parse(JSON.stringify(currKey));
    city.city = JSON.parse(JSON.stringify(currCity));
    cities.push(city);

    localStorage.setItem("cities", JSON.stringify(cities));
}

// Store new city data
function storeNewCityData(index) {
    cities[index].city = JSON.parse(JSON.stringify(currCity));

    localStorage.setItem("cities", JSON.stringify(cities));
}

// retrieve stored city data when button is pressed
function getCityData(event) {
    var button = event.target;
    console.log(button);
    if (button.getAttribute('class') !== 'btn') {
        console.log("not a button");
        return;
    }
    changeVisibility("visible");

    var key = button.getAttribute('data-key');
    console.log(key);

    for (var i = 0; i < cities.length; i++) {
        console.log(cities[i].key === key);
        var city = cities[i];
        if (cities[i].key === key) {
            console.log(cities[i].city);
            setCityData(cities[i].city);
        }
    }
}

// sets city data into appropriate elements
function setCityData(city) {
    // first title
    var firstTitleEl = citySectEl.querySelector('#city-title');
    firstTitleEl.textContent = city.title;
    
    // first icon
    var firstIconEl = citySectEl.querySelector('.icon');
    firstIconEl.setAttribute("src", city.icon);


    // first temp
    var firstTempEl = citySectEl.querySelector('.temp');
    firstTempEl.textContent = "Temp: " + city.temp + " °F";

    // first wind
    var firstWindEl = citySectEl.querySelector('.wind');
    firstWindEl.textContent = "Wind: " + city.wind + " MPH";

    // first humidity
    var firstHumidityEl = citySectEl.querySelector('.humidity');
    firstHumidityEl.textContent = "Humidity: " + city.humidity + "%";

    // days
    var dates = daysSectEl.querySelectorAll(".dates");
    var icons = daysSectEl.querySelectorAll(".icon");
    var temps = daysSectEl.querySelectorAll(".temp");
    var winds = daysSectEl.querySelectorAll(".wind");
    var humidities = daysSectEl.querySelectorAll(".humidity");

    for (var i = 0; i < 5; i++) {
        // date
        dates[i].textContent = city.days[i].date;

        // icon
        icons[i].setAttribute("src", city.days[i].icon);

        // temp
        temps[i].textContent = "Temp: " + city.days[i].temp + " °F";

        // wind
        winds[i].textContent = "Wind: " + city.days[i].wind + " MPH";

        // humidity
        humidities[i].textContent = "Humidity: " + city.days[i].humidity + "%";

    }
}

// change visibility to shown
function changeVisibility(visibility) {
    if (visibility === "visible") {
        citySectEl.setAttribute('data-visibility', 'visible');
        citySectEl.setAttribute('style', 'display: inline');

        daysTitleSectEl.setAttribute('data-visibility', 'visible');
        daysTitleSectEl.setAttribute('style', 'display: inline');

        daysSectEl.setAttribute('data-visibility', 'visible');
        daysSectEl.setAttribute('style', 'display: flex');
    } else {
        citySectEl.setAttribute('data-visibility', 'hidden');
        citySectEl.setAttribute('style', 'display: none');

        daysTitleSectEl.setAttribute('data-visibility', 'hidden');
        daysTitleSectEl.setAttribute('style', 'display: none');

        daysSectEl.setAttribute('data-visibility', 'hidden');
        daysSectEl.setAttribute('style', 'display: none');
    }
}

// load cities from local storage
loadFromStorage();
// call get Api function after button search button pressed
searchBtnEl.addEventListener('click', getApiToday);

buttonSectEl.addEventListener('click', getCityData);